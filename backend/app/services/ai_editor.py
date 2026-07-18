import os
from openai import OpenAI
import ffmpeg

class AIEditor:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def extract_audio(self, video_path: str, output_audio_path: str):
        """Extracts audio from video for Whisper transcription."""
        (
            ffmpeg
            .input(video_path)
            .output(output_audio_path, acodec='libmp3lame', ab='128k', ac=1, ar='16000')
            .overwrite_output()
            .run(quiet=True)
        )
        return output_audio_path

    def transcribe_audio(self, audio_path: str) -> str:
        """Transcribes audio using OpenAI Whisper API."""
        with open(audio_path, "rb") as audio_file:
            transcript = self.client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="text"
            )
        return transcript

    def extract_highlight_timestamps(self, transcript_text: str) -> dict:
        """Uses LLM to find the most engaging 60-second part."""
        prompt = f"""
        You are an expert short-form video editor. Read the following transcript and find the single most engaging and viral part.
        Return ONLY a JSON object with 'start_time' and 'end_time' in seconds (duration must be under 60 seconds).
        Transcript: {transcript_text[:3000]} # Truncated for token limit in MVP
        """
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": prompt}
            ],
            response_format={ "type": "json_object" }
        )
        import json
        return json.loads(response.choices[0].message.content)

    def cut_and_crop_video(self, video_path: str, output_path: str, start_time: int, end_time: int):
        """Cuts the video and crops it to 9:16 vertical format."""
        duration = end_time - start_time
        
        # Simple center crop for 9:16 format (e.g. 1080x1920)
        # Assumes landscape 16:9 input.
        stream = ffmpeg.input(video_path, ss=start_time, t=duration)
        stream = ffmpeg.filter(stream, 'crop', 'ih*9/16', 'ih') # Center crop width to be 9/16 of height
        stream = ffmpeg.filter(stream, 'scale', 1080, 1920)
        
        (
            ffmpeg
            .output(stream, output_path, vcodec='libx264', acodec='aac', strict='experimental')
            .overwrite_output()
            .run(quiet=True)
        )
        return output_path
