import os
import logging
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

logger = logging.getLogger(__name__)

class YoutubeUploader:
    def __init__(self, refresh_token: str):
        self.refresh_token = refresh_token
        self.client_id = os.getenv("YOUTUBE_CLIENT_ID")
        self.client_secret = os.getenv("YOUTUBE_CLIENT_SECRET")
        self.token_uri = "https://oauth2.googleapis.com/token"

    def _get_credentials(self):
        return Credentials(
            token=None,
            refresh_token=self.refresh_token,
            client_id=self.client_id,
            client_secret=self.client_secret,
            token_uri=self.token_uri
        )

    def upload(self, file_path: str, title: str = "Automated AI Clip", description: str = "#shorts #ai"):
        if not self.refresh_token or not self.client_id:
            logger.warning("YouTube Upload skipped: No valid token or client_id found.")
            return False

        try:
            creds = self._get_credentials()
            youtube = build('youtube', 'v3', credentials=creds)

            body = {
                'snippet': {
                    'title': title,
                    'description': description,
                    'tags': ['shorts', 'gaming', 'ai'],
                    'categoryId': '20' # Gaming
                },
                'status': {
                    'privacyStatus': 'public',
                    'selfDeclaredMadeForKids': False
                }
            }

            media = MediaFileUpload(file_path, chunksize=-1, resumable=True)

            request = youtube.videos().insert(
                part="snippet,status",
                body=body,
                media_body=media
            )
            
            response = request.execute()
            logger.info(f"Successfully uploaded to YouTube. Video ID: {response.get('id')}")
            return True

        except Exception as e:
            logger.error(f"Failed to upload to YouTube: {e}")
            raise e
