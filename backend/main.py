from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.api.endpoints import videos, settings, accounts, auth
from app.models.video import SourceVideo, Clip
from app.models.setting import Setting
from app.models.account import SocialAccount, Persona

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI-Clip Stream API",
    description="Backend API for AI YouTube Clipping & Automation",
    version="1.0.0",
)

# Register routers
app.include_router(videos.router, prefix="/api/videos", tags=["videos"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])
app.include_router(accounts.router, prefix="/api/accounts", tags=["accounts"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AI-Clip Stream API is running."}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
