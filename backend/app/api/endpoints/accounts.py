from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.core.database import get_db
from app.models.account import SocialAccount, Persona
from app.models.video import SourceVideo, Clip, ProcessStatus

router = APIRouter()

class PersonaBase(BaseModel):
    prompt: Optional[str] = None
    quota: int = 3
    template: str = "Gaming Bold"
    target_channels: Optional[str] = None
    ai_generation_enabled: bool = False

class AccountResponse(BaseModel):
    id: str
    email: str
    status: str
    platforms: List[str]
    persona: PersonaBase
    clips: List[dict]
    has_youtube_token: bool
    has_tiktok_token: bool
    has_instagram_token: bool

@router.get("/", response_model=List[AccountResponse])
def get_accounts(db: Session = Depends(get_db)):
    accounts = db.query(SocialAccount).all()
    if not accounts:
        mock_acc = SocialAccount(id="gaming_ch", email="mock@youtube.com", status="Active", platforms="YouTube,TikTok")
        mock_persona = Persona(account_id="gaming_ch", prompt="Make it exciting gaming clips", quota=5, template="Gaming Bold")
        db.add(mock_acc)
        db.add(mock_persona)
        db.commit()
        db.refresh(mock_acc)
        accounts = [mock_acc]

    result = []
    for acc in accounts:
        persona = acc.persona
        if not persona:
            persona = Persona(account_id=acc.id, prompt="", quota=3, template="Gaming Bold")
            db.add(persona)
            db.commit()
            db.refresh(persona)
            
        mock_clips = [
            { "id": 1, "title": "Elden Ring Secret Boss Melted!", "status": "Done", "platforms": { "youtube": "Uploaded", "tiktok": "Uploaded", "instagram": "Pending" } },
            { "id": 2, "title": "Best FPS Setup 2026", "status": "Done", "platforms": { "youtube": "Pending", "tiktok": "Pending", "instagram": "Pending" } },
            { "id": 3, "title": "No Hit Run Highlight", "status": "Rendering", "platforms": { "youtube": "N/A", "tiktok": "N/A", "instagram": "N/A" } }
        ]
        
        platforms_list = acc.platforms.split(",") if acc.platforms else ["YouTube"]
        
        result.append(AccountResponse(
            id=acc.id,
            email=acc.email if acc.email else "user@example.com",
            status=acc.status,
            platforms=platforms_list,
            persona=PersonaBase(
                prompt=persona.prompt,
                quota=persona.quota,
                template=persona.template,
                target_channels=persona.target_channels,
                ai_generation_enabled=persona.ai_generation_enabled
            ),
            clips=mock_clips,
            has_youtube_token=bool(acc.youtube_refresh_token),
            has_tiktok_token=bool(acc.tiktok_access_token),
            has_instagram_token=bool(acc.instagram_access_token)
        ))
    return result

@router.post("/{account_id}/persona", response_model=PersonaBase)
def update_persona(account_id: str, persona_data: PersonaBase, db: Session = Depends(get_db)):
    persona = db.query(Persona).filter(Persona.account_id == account_id).first()
    if not persona:
        # Check if account exists
        acc = db.query(SocialAccount).filter(SocialAccount.id == account_id).first()
        if not acc:
            raise HTTPException(status_code=404, detail="Account not found")
        persona = Persona(account_id=account_id)
        db.add(persona)
        
    persona.prompt = persona_data.prompt
    persona.quota = persona_data.quota
    persona.template = persona_data.template
    persona.target_channels = persona_data.target_channels
    persona.ai_generation_enabled = persona_data.ai_generation_enabled
    
    db.commit()
    db.refresh(persona)
    
    return PersonaBase(
        prompt=persona.prompt,
        quota=persona.quota,
        template=persona.template,
        target_channels=persona.target_channels,
        ai_generation_enabled=persona.ai_generation_enabled
    )
