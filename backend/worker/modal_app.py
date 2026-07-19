import modal
import os

app = modal.App("autoclip-worker")

image = modal.Image.debian_slim().pip_install(
    "openai",
    "google-generativeai"
)

@app.function()
def hello_world(name: str = "World"):
    return f"Hello {name} from Modal!"

@app.function(image=image, secrets=[])
def extract_highlights(transcript: str, preferred_model: str = "openai", openai_api_key: str = None, gemini_api_key: str = None):
    """
    Extract highlights from a transcript using the preferred LLM.
    """
    prompt = f"이 유튜브 대본 중에서 틱톡/쇼츠로 올렸을 때 가장 시청자의 흥미를 끌 만한 30초~60초 분량의 하이라이트 구간 3개를 찾아줘. 그리고 숏폼의 제목도 지어줘.\n\n대본: {transcript}"
    
    if preferred_model == "gemini":
        if not gemini_api_key:
            raise ValueError("Gemini API key is missing.")
        import google.generativeai as genai
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    else:
        # Default to OpenAI
        if not openai_api_key:
            raise ValueError("OpenAI API key is missing.")
        from openai import OpenAI
        client = OpenAI(api_key=openai_api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert video editor who creates engaging short-form videos."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
