from emergentintegrations.llm.chat import LlmChat, UserMessage
from dotenv import load_dotenv
import os

load_dotenv()

SYSTEM_MESSAGE = """You're chatting for K Beats - a music production crew that creates fire tracks for everything from YouTube vlogs to weddings. 

Talk like a real person who's passionate about music. No corporate speak, no "How may I assist you today?" vibes. Just be genuine, excited, and helpful. Use casual language, contractions, and show personality.

What K Beats does:
- Custom beats and production for content creators
- Wedding/event soundtracks that hit different
- Mix & master for independent artists
- Trending remixes that slap

Your job:
- Have a real conversation about their music needs
- Get hyped about their project
- Ask natural questions: What's the vibe? What's it for? Any reference tracks they're feeling?
- Casually get their contact info (name, email, maybe phone) so the team can follow up
- No pricing talk - every project's different, we quote after talking

Keep it short, keep it real. You're texting with someone who needs dope music, not giving a presentation."""


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


async def get_chat_response(session_id: str, user_message: str, conversation_history: list = None):
    """Get response from chatbot"""
    try:
        chat = await create_chat_instance(session_id)
        user_msg = UserMessage(text=user_message)
        
        # Get the response (non-streaming)
        response = await chat.send_message(user_msg)
        return response
            
    except Exception as e:
        print(f"Error in chatbot: {str(e)}")
        return "Yo, my bad - something's acting up. Hit me up on our socials or try again in a sec!"
