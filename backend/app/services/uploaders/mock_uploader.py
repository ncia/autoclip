import time
import logging

logger = logging.getLogger(__name__)

class MockUploader:
    def __init__(self, platform: str):
        self.platform = platform

    def upload(self, file_path: str, title: str = "Automated Clip", description: str = "") -> bool:
        logger.info(f"[{self.platform}] Starting mock upload for {file_path}")
        # Simulate network delay
        time.sleep(2)
        logger.info(f"[{self.platform}] Successfully uploaded to {self.platform} - Title: {title}")
        return True

class YoutubeUploader(MockUploader):
    def __init__(self):
        super().__init__("YouTube Shorts")

class TiktokUploader(MockUploader):
    def __init__(self):
        super().__init__("TikTok")

class InstagramUploader(MockUploader):
    def __init__(self):
        super().__init__("Instagram Reels")
