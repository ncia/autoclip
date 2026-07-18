import yt_dlp
import os
import uuid

class VideoDownloader:
    def __init__(self, output_dir: str = "./downloads"):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

    def download_video(self, url: str) -> dict:
        """
        Downloads a YouTube video and returns metadata and file path.
        """
        video_id = str(uuid.uuid4())
        output_path_template = os.path.join(self.output_dir, f"{video_id}.%(ext)s")

        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            'outtmpl': output_path_template,
            'quiet': False,
            'no_warnings': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info_dict)
            
            return {
                "video_id": video_id,
                "title": info_dict.get('title', 'Unknown Title'),
                "duration": info_dict.get('duration', 0),
                "filepath": filename
            }

# Example usage
# downloader = VideoDownloader()
# info = downloader.download_video("https://www.youtube.com/watch?v=YOUR_VIDEO_ID")
