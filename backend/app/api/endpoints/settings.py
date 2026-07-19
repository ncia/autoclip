from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from app.core.database import get_db
from app.models.setting import Setting

router = APIRouter()

class SettingItem(BaseModel):
    key: str
    value: Optional[str] = None

class SettingsUpdate(BaseModel):
    settings: List[SettingItem]

@router.get("/")
def get_settings(db: Session = Depends(get_db)):
    settings_db = db.query(Setting).all()
    masked_settings = []
    for s in settings_db:
        masked_val = s.value
        # Mask sensitive keys
        if s.value and ("key" in s.key.lower() or "token" in s.key.lower() or "secret" in s.key.lower()):
            masked_val = "********"
        masked_settings.append({"key": s.key, "value": masked_val})
    return {"settings": masked_settings}

@router.post("/")
def update_settings(data: SettingsUpdate, db: Session = Depends(get_db)):
    for item in data.settings:
        if item.value == "********":
            continue # Skip updating if masked
            
        setting_db = db.query(Setting).filter(Setting.key == item.key).first()
        if setting_db:
            setting_db.value = item.value
        else:
            setting_db = Setting(key=item.key, value=item.value)
            db.add(setting_db)
    
    db.commit()
    return {"status": "success", "message": "Settings updated"}

@router.get("/internal/{key}")
def get_internal_setting(key: str, db: Session = Depends(get_db)):
    # Internal endpoint for workers to fetch keys
    setting_db = db.query(Setting).filter(Setting.key == key).first()
    if not setting_db:
        return {"key": key, "value": None}
    return {"key": key, "value": setting_db.value}
