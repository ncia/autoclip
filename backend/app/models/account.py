from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class SocialAccount(Base):
    __tablename__ = "social_accounts"

    id = Column(String, primary_key=True, index=True) # UUID or string ID like 'abc'
    email = Column(String, index=True)
    status = Column(String, default="Active")
    platforms = Column(String) # Stored as comma-separated values for simplicity, e.g., "YouTube,TikTok"
    
    youtube_refresh_token = Column(String, nullable=True)
    tiktok_access_token = Column(String, nullable=True)
    instagram_access_token = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    persona = relationship("Persona", back_populates="account", uselist=False)

class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(String, ForeignKey("social_accounts.id"), unique=True)
    prompt = Column(String, nullable=True)
    quota = Column(Integer, default=3)
    template = Column(String, default="Gaming Bold")
    target_channels = Column(String, nullable=True) # Comma-separated channel URLs or IDs
    ai_generation_enabled = Column(Boolean, default=False)
    
    account = relationship("SocialAccount", back_populates="persona")
