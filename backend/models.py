from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid


class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ChatMessageCreate(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    session_id: str
    response: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class MusicInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    project_type: Optional[str] = None  # vlog, event, wedding, mixing, production
    requirements: str
    conversation_history: List[dict] = []
    status: str = "pending"  # pending, contacted, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ContactForm(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    project_type: Optional[str] = None
