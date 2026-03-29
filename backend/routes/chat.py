from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse
from models import ChatMessage, ChatMessageCreate, ChatResponse, MusicInquiry
from chatbot import get_chat_response
from email_service import email_service
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
import json

router = APIRouter(prefix="/chat", tags=["chat"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'myapp')]


async def send_lead_email_background(session_id: str):
    """Background task to send lead notification email"""
    try:
        inquiry = await db.inquiries.find_one({"session_id": session_id}, {"_id": 0})
        if inquiry:
            await email_service.send_lead_notification(inquiry)
    except Exception as e:
        print(f"Error sending lead email: {str(e)}")


@router.post("/message")
async def send_message(chat_input: ChatMessageCreate, background_tasks: BackgroundTasks):
    """Send a message to the chatbot and get response"""
    try:
        # Save user message
        user_message = ChatMessage(
            session_id=chat_input.session_id,
            role="user",
            content=chat_input.message
        )
        await db.chat_messages.insert_one(user_message.dict())
        
        # Check if this is a new inquiry
        inquiry = await db.inquiries.find_one({"session_id": chat_input.session_id})
        is_new_inquiry = inquiry is None
        
        if is_new_inquiry:
            inquiry_data = MusicInquiry(
                session_id=chat_input.session_id,
                requirements=chat_input.message,
                conversation_history=[
                    {"role": "user", "content": chat_input.message, "timestamp": datetime.utcnow().isoformat()}
                ]
            )
            await db.inquiries.insert_one(inquiry_data.dict())
        else:
            await db.inquiries.update_one(
                {"session_id": chat_input.session_id},
                {
                    "$push": {
                        "conversation_history": {
                            "role": "user", 
                            "content": chat_input.message, 
                            "timestamp": datetime.utcnow().isoformat()
                        }
                    }
                }
            )
        
        # Get response from chatbot (non-streaming)
        response = await get_chat_response(chat_input.session_id, chat_input.message)
        
        # Save assistant message
        assistant_message = ChatMessage(
            session_id=chat_input.session_id,
            role="assistant",
            content=response
        )
        await db.chat_messages.insert_one(assistant_message.dict())
        
        # Update inquiry with assistant response
        await db.inquiries.update_one(
            {"session_id": chat_input.session_id},
            {
                "$push": {
                    "conversation_history": {
                        "role": "assistant",
                        "content": response,
                        "timestamp": datetime.utcnow().isoformat()
                    }
                }
            }
        )
        
        # Send email notification for new inquiries (in background)
        if is_new_inquiry:
            background_tasks.add_task(send_lead_email_background, chat_input.session_id)
        
        # Send response as SSE for frontend compatibility
        async def generate_stream():
            yield f"data: {json.dumps({'chunk': response})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
        
        return StreamingResponse(
            generate_stream(),
            media_type="text/event-stream"
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
