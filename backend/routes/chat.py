from fastapi import APIRouter, HTTPException
from models import ChatMessage, ChatMessageCreate, ChatResponse, MusicInquiry
from chatbot import get_chat_response
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

router = APIRouter(prefix="/chat", tags=["chat"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'myapp')]


@router.post("/message", response_model=ChatResponse)
async def send_message(chat_input: ChatMessageCreate):
    """Send a message to the chatbot and get response"""
    try:
        # Get conversation history for this session
        history = await db.chat_messages.find(
            {"session_id": chat_input.session_id}
        ).sort("timestamp", 1).to_list(100)
        
        # Save user message
        user_message = ChatMessage(
            session_id=chat_input.session_id,
            role="user",
            content=chat_input.message
        )
        await db.chat_messages.insert_one(user_message.dict())
        
        # Get AI response
        response_text = await get_chat_response(
            chat_input.session_id,
            chat_input.message,
            history
        )
        
        # Save assistant message
        assistant_message = ChatMessage(
            session_id=chat_input.session_id,
            role="assistant",
            content=response_text
        )
        await db.chat_messages.insert_one(assistant_message.dict())
        
        # Update or create inquiry record
        inquiry = await db.inquiries.find_one({"session_id": chat_input.session_id})
        if not inquiry:
            inquiry_data = MusicInquiry(
                session_id=chat_input.session_id,
                requirements=chat_input.message,
                conversation_history=[
                    {"role": "user", "content": chat_input.message, "timestamp": datetime.utcnow().isoformat()},
                    {"role": "assistant", "content": response_text, "timestamp": datetime.utcnow().isoformat()}
                ]
            )
            await db.inquiries.insert_one(inquiry_data.dict())
        else:
            # Update existing inquiry
            await db.inquiries.update_one(
                {"session_id": chat_input.session_id},
                {
                    "$push": {
                        "conversation_history": {
                            "$each": [
                                {"role": "user", "content": chat_input.message, "timestamp": datetime.utcnow().isoformat()},
                                {"role": "assistant", "content": response_text, "timestamp": datetime.utcnow().isoformat()}
                            ]
                        }
                    }
                }
            )
        
        return ChatResponse(
            session_id=chat_input.session_id,
            response=response_text
        )
    except Exception as e:
        print(f"Error in send_message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        messages = await db.chat_messages.find(
            {"session_id": session_id}
        ).sort("timestamp", 1).to_list(1000)
        
        return [ChatMessage(**msg) for msg in messages]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/inquiry/{session_id}/update")
async def update_inquiry_info(session_id: str, name: str = None, email: str = None, phone: str = None, project_type: str = None):
    """Update inquiry with user contact information"""
    try:
        update_data = {}
        if name:
            update_data["name"] = name
        if email:
            update_data["email"] = email
        if phone:
            update_data["phone"] = phone
        if project_type:
            update_data["project_type"] = project_type
        
        result = await db.inquiries.update_one(
            {"session_id": session_id},
            {"$set": update_data}
        )
        
        return {"success": True, "modified": result.modified_count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
