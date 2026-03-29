from fastapi import APIRouter, HTTPException
from models import ContactForm, MusicInquiry
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid

router = APIRouter(prefix="/contact", tags=["contact"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'myapp')]


@router.post("/submit")
async def submit_contact_form(form: ContactForm):
    """Submit contact form"""
    try:
        inquiry = MusicInquiry(
            session_id=f"contact-{str(uuid.uuid4())}",
            name=form.name,
            email=form.email,
            phone=form.phone,
            project_type=form.project_type,
            requirements=form.message,
            conversation_history=[],
            status="pending"
        )
        
        await db.inquiries.insert_one(inquiry.dict())
        
        return {
            "success": True,
            "message": "Thank you! We'll get back to you soon."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/inquiries")
async def get_all_inquiries():
    """Get all inquiries (for admin)"""
    try:
        inquiries = await db.inquiries.find().sort("created_at", -1).to_list(1000)
        return inquiries
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
