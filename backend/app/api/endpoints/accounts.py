from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.core.database import get_db
from app.models.account import SocialAccount, Persona
import uuid

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

class AccountCreate(BaseModel):
    id: str
    email: str
    platforms: str

@router.get("/", response_model=List[AccountResponse])
def get_accounts(db: Session = Depends(get_db)):
    accounts = db.query(SocialAccount).all()
    
    result = []
    for acc in accounts:
        persona = acc.persona
        if not persona:
            persona = Persona(account_id=acc.id, prompt="", quota=3, template="Gaming Bold")
            db.add(persona)
            db.commit()
            db.refresh(persona)
            
        platforms_list = acc.platforms.split(",") if acc.platforms else []
        
        result.append(AccountResponse(
            id=acc.id,
            email=acc.email if acc.email else "",
            status=acc.status,
            platforms=platforms_list,
            persona=PersonaBase(
                prompt=persona.prompt,
                quota=persona.quota,
                template=persona.template,
                target_channels=persona.target_channels,
                ai_generation_enabled=persona.ai_generation_enabled
            ),
            clips=[], # Empty for now, in reality fetch from DB
            has_youtube_token=bool(acc.youtube_refresh_token),
            has_tiktok_token=bool(acc.tiktok_access_token),
            has_instagram_token=bool(acc.instagram_access_token)
        ))
    return result

@router.post("/", response_model=AccountResponse)
def create_account(account_in: AccountCreate, db: Session = Depends(get_db)):
    # Check if ID already exists
    existing = db.query(SocialAccount).filter(SocialAccount.id == account_in.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Account with this ID/Handle already exists.")

    new_account = SocialAccount(
        id=account_in.id,
        email=account_in.email,
        status="Pending",
        platforms=account_in.platforms
    )
    db.add(new_account)
    db.commit()
    db.refresh(new_account)

    # Create default persona
    new_persona = Persona(account_id=new_account.id, prompt="Generate engaging viral content", quota=3, template="Standard")
    db.add(new_persona)
    db.commit()
    
    platforms_list = new_account.platforms.split(",") if new_account.platforms else []
    
    return AccountResponse(
        id=new_account.id,
        email=new_account.email,
        status=new_account.status,
        platforms=platforms_list,
        persona=PersonaBase(
            prompt=new_persona.prompt,
            quota=new_persona.quota,
            template=new_persona.template,
            target_channels=new_persona.target_channels,
            ai_generation_enabled=new_persona.ai_generation_enabled
        ),
        clips=[],
        has_youtube_token=False,
        has_tiktok_token=False,
        has_instagram_token=False
    )

@router.post("/{account_id}/persona", response_model=PersonaBase)
def update_persona(account_id: str, persona_data: PersonaBase, db: Session = Depends(get_db)):
    persona = db.query(Persona).filter(Persona.account_id == account_id).first()
    if not persona:
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
