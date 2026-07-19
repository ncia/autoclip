import logging
from app.core.celery_app import celery_app
from app.core.database import SessionLocal
from app.models.account import SocialAccount, Persona
from app.models.video import SourceVideo
from app.services.crawler import VideoCrawler, AIGenerator
from app.worker import process_video_task

logger = logging.getLogger(__name__)

@celery_app.task(name="app.cron_tasks.fetch_and_queue_videos")
def fetch_and_queue_videos():
    """
    Periodically checks all personas and queues up videos based on target_channels
    or triggers AI generation if enabled.
    """
    db = SessionLocal()
    try:
        accounts = db.query(SocialAccount).all()
        crawler = VideoCrawler()
        ai_gen = AIGenerator()

        for account in accounts:
            persona = account.persona
            if not persona:
                continue
                
            # If AI Generation is enabled
            if persona.ai_generation_enabled:
                if persona.prompt:
                    video_info = ai_gen.generate_video_from_persona(persona.prompt, persona.template)
                    # Add to SourceVideo queue
                    new_video = SourceVideo(original_url=video_info['url'], title=video_info['title'])
                    db.add(new_video)
                    db.commit()
                    db.refresh(new_video)
                    process_video_task.delay(new_video.id)
                    logger.info(f"Queued AI generated video for account {account.id}")
            
            # If Target Channels are provided
            elif persona.target_channels:
                channels = [url.strip() for url in persona.target_channels.split(',') if url.strip()]
                videos = crawler.fetch_latest_videos(channels, max_videos=1) # Fetch only 1 latest per run
                
                for v in videos:
                    # Check if already exists in DB to prevent duplicates
                    existing = db.query(SourceVideo).filter(SourceVideo.original_url == v['url']).first()
                    if not existing:
                        new_video = SourceVideo(original_url=v['url'], title=v['title'])
                        db.add(new_video)
                        db.commit()
                        db.refresh(new_video)
                        process_video_task.delay(new_video.id)
                        logger.info(f"Queued crawled video {v['url']} for account {account.id}")
                        
    except Exception as e:
        logger.error(f"Error in fetch_and_queue_videos: {e}")
    finally:
        db.close()
