import logging
import yt_dlp
from typing import List

logger = logging.getLogger(__name__)

class VideoCrawler:
    def __init__(self):
        self.ydl_opts = {
            'extract_flat': True,
            'quiet': True,
        }

    def fetch_latest_videos(self, channel_urls: List[str], max_videos: int = 3) -> List[dict]:
        """
        Fetches the latest videos from the given YouTube channel URLs.
        """
        videos = []
        try:
            with yt_dlp.YoutubeDL(self.ydl_opts) as ydl:
                for url in channel_urls:
                    url = url.strip()
                    if not url:
                        continue
                        
                    logger.info(f"Crawling channel: {url}")
                    # Extract info without downloading
                    info = ydl.extract_info(url, download=False)
                    
                    if 'entries' in info:
                        # It's a playlist/channel
                        entries = info['entries']
                        for i, entry in enumerate(entries):
                            if i >= max_videos:
                                break
                            videos.append({
                                'url': entry.get('url'),
                                'title': entry.get('title'),
                                'channel': url
                            })
                    else:
                        # It's a single video
                        videos.append({
                            'url': info.get('webpage_url', url),
                            'title': info.get('title'),
                            'channel': url
                        })
        except Exception as e:
            logger.error(f"Error crawling channels: {e}")

        return videos

class AIGenerator:
    def __init__(self):
        pass

    def generate_video_from_persona(self, prompt: str, template: str) -> dict:
        """
        Mock AI Generator that creates a completely synthetic video clip
        based on the user's prompt instead of crawling a channel.
        """
        logger.info(f"AI Generation Triggered: {prompt} with template {template}")
        
        # In a real scenario, this would call RunwayML, Sora, or internal Text-to-Video models
        # and return a URL or file path.
        return {
            'url': 'https://example.com/ai_generated_mock.mp4',
            'title': f"AI Generated: {prompt[:20]}...",
            'is_ai_generated': True
        }
