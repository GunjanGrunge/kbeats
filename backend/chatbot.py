from emergentintegrations.llm.chat import LlmChat, UserMessage
from dotenv import load_dotenv
import os

load_dotenv()

SYSTEM_MESSAGE = """You are K Beats AI Assistant, a friendly and knowledgeable chatbot for K Beats - a professional music mixing and production service.

K Beats specializes in:
- Custom music production for vlogs, events, weddings, and special moments
- Trending song remixes and mashups
- Music mixing and mastering services
- Supporting individual artists with production

Your role is to:
1. Warmly greet visitors and understand their music needs
2. Ask relevant questions about their project:
   - Type of project (vlog, event, wedding, personal, artist support)
   - Style preferences and mood
   - Timeline and urgency
   - Reference songs or artists they like
3. Collect contact information (name, email, phone) naturally in conversation
4. Explain that K Beats provides personalized quotes based on individual needs
5. Assure them the team will reach out to discuss their project in detail

Be conversational, enthusiastic about music, and helpful. Keep responses concise but warm. Don't discuss pricing - emphasize personalized service and creative collaboration."""


async def create_chat_instance(session_id: str) -> LlmChat:
    """Create a new chat instance for a session"""
    api_key = os.getenv("EMERGENT_LLM_KEY")
    
    if not api_key:
        raise ValueError("EMERGENT_LLM_KEY not found in environment variables")
    
    chat = LlmChat(
        api_key=api_key,
        session_id=session_id,
        system_message=SYSTEM_MESSAGE
    )
    
    # Use Claude Sonnet 4.5
    chat.with_model("anthropic", "claude-sonnet-4-5-20250929")
    
    return chat


async def get_chat_response(session_id: str, user_message: str, conversation_history: list = None) -> str:
    """Get response from chatbot"""
    try:
        chat = await create_chat_instance(session_id)
        
        # If there's conversation history, we need to add it back to context
        # Note: The LlmChat handles history automatically per session
        
        user_msg = UserMessage(text=user_message)
        response = await chat.send_message(user_msg)
        
        return response
    except Exception as e:
        print(f"Error in chatbot: {str(e)}")
        return "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly through our social media channels."
