from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.core.database import get_db
from app.models.video import SourceVideo, ProcessStatus, Clip
from app.worker import process_video_task

router = APIRouter()

class ProcessVideoRequest(BaseModel):
    url: str

class VideoStatusResponse(BaseModel):
    video_id: int
    status: str
    clip_path: Optional[str] = None
    original_url: str
    title: Optional[str] = None

@router.post("/process")
def process_video(request: ProcessVideoRequest, db: Session = Depends(get_db)):
    # 1. Create SourceVideo record
    new_video = SourceVideo(original_url=request.url)
    db.add(new_video)
    db.commit()
    db.refresh(new_video)
    
    # 2. Add to celery queue
    process_video_task.delay(new_video.id)
    
    return {"video_id": new_video.id, "status": new_video.status.value}

@router.get("/{video_id}", response_model=VideoStatusResponse)
def get_video_status(video_id: int, db: Session = Depends(get_db)):
    video = db.query(SourceVideo).filter(SourceVideo.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
        
    clip_path = None
    if video.status == ProcessStatus.COMPLETED:
        clip = db.query(Clip).filter(Clip.source_video_id == video.id).first()
        if clip:
            clip_path = clip.output_path
            
    return VideoStatusResponse(
        video_id=video.id,
        status=video.status.value,
        clip_path=clip_path,
        original_url=video.original_url,
        title=video.title
    )
