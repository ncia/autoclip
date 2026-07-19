from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base

class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True, nullable=False)
    value = Column(String, nullable=True) # Note: For prototype, storing as plain text. In production, use encryption.
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
