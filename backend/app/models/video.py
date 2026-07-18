from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class ProcessStatus(enum.Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class SourceVideo(Base):
    __tablename__ = "source_videos"

    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(String, unique=True, index=True)
    title = Column(String, nullable=True)
    status = Column(Enum(ProcessStatus), default=ProcessStatus.PENDING)
    downloaded_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    clips = relationship("Clip", back_populates="source")

class Clip(Base):
    __tablename__ = "clips"

    id = Column(Integer, primary_key=True, index=True)
    source_video_id = Column(Integer, ForeignKey("source_videos.id"))
    output_path = Column(String)
    script_summary = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    source = relationship("SourceVideo", back_populates="clips")
