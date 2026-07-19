import os
import time
from app.core.celery_app import celery_app
from app.core.database import SessionLocal
from app.models.video import SourceVideo, ProcessStatus, Clip
from app.services.downloader import VideoDownloader
from app.services.ai_editor import AIEditor

@celery_app.task(name="app.worker.process_video_task")
def process_video_task(video_id: int):
    db = SessionLocal()
    video = db.query(SourceVideo).filter(SourceVideo.id == video_id).first()
    
    if not video:
        db.close()
        return {"error": "Video not found"}
        
    try:
        # 1. Update status to PROCESSING
        video.status = ProcessStatus.PROCESSING
        db.commit()

        # 2. Download video
        downloader = VideoDownloader(output_dir="./downloads")
        download_info = downloader.download_video(video.original_url)
        video.downloaded_path = download_info["filepath"]
        video.title = download_info.get("title", "Unknown Title")
        db.commit()

        # 3. AI Editor pipeline
        editor = AIEditor()
        
        # Audio Extraction
        audio_path = f"./downloads/{download_info['video_id']}.mp3"
        editor.extract_audio(video.downloaded_path, audio_path)
        
        # Transcription
        transcript = editor.transcribe_audio(audio_path)
        
        # Highlight Extraction
        timestamps = editor.extract_highlight_timestamps(transcript)
        start_time = timestamps.get("start_time", 0)
        end_time = timestamps.get("end_time", min(start_time + 60, int(download_info.get("duration", 60))))
        
        # Cut and Crop
        output_clip_path = f"./downloads/{download_info['video_id']}_clip.mp4"
        editor.cut_and_crop_video(
            video_path=video.downloaded_path,
            output_path=output_clip_path,
            start_time=int(start_time),
            end_time=int(end_time)
        )
        
        # 4. Save results to DB
        new_clip = Clip(
            source_video_id=video.id,
            output_path=output_clip_path,
            script_summary=f"Highlight from {start_time} to {end_time}s"
        )
        db.add(new_clip)
        video.status = ProcessStatus.COMPLETED
        db.commit()
        db.refresh(new_clip)
        
        # 5. Execute Mock Uploads
        from app.services.uploaders.mock_uploader import YoutubeUploader, TiktokUploader, InstagramUploader
        
        # Try YouTube
        try:
            YoutubeUploader().upload(output_clip_path)
            new_clip.youtube_status = "Uploaded (Mock)"
        except Exception:
            new_clip.youtube_status = "Failed"
            
        # Try TikTok
        try:
            TiktokUploader().upload(output_clip_path)
            new_clip.tiktok_status = "Uploaded (Mock)"
        except Exception:
            new_clip.tiktok_status = "Failed"
            
        # Try Instagram
        try:
            InstagramUploader().upload(output_clip_path)
            new_clip.instagram_status = "Uploaded (Mock)"
        except Exception:
            new_clip.instagram_status = "Failed"
            
        db.commit()
        
        # Cleanup audio
        if os.path.exists(audio_path):
            os.remove(audio_path)
            
    except Exception as e:
        db.rollback()
        video.status = ProcessStatus.FAILED
        db.commit()
        raise e
    finally:
        db.close()
