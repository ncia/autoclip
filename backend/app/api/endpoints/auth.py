from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.account import SocialAccount
import os

router = APIRouter()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# --- YouTube OAuth ---
@router.get("/youtube/login")
def youtube_login(account_id: str):
    # In a real app, use google_auth_oauthlib.flow.Flow
    # For now, we mock the redirect back with a fake code
    callback_url = f"http://localhost:8000/api/auth/youtube/callback?account_id={account_id}&code=mock_yt_code"
    return RedirectResponse(url=callback_url)

@router.get("/youtube/callback")
def youtube_callback(account_id: str, code: str, db: Session = Depends(get_db)):
    # In a real app, exchange `code` for `refresh_token`
    account = db.query(SocialAccount).filter(SocialAccount.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
        
    account.youtube_refresh_token = f"real_yt_token_for_{code}"
    db.commit()
    return RedirectResponse(url=f"{FRONTEND_URL}/automations?auth=youtube_success")

# --- TikTok OAuth ---
@router.get("/tiktok/login")
def tiktok_login(account_id: str):
    callback_url = f"http://localhost:8000/api/auth/tiktok/callback?account_id={account_id}&code=mock_tk_code"
    return RedirectResponse(url=callback_url)

@router.get("/tiktok/callback")
def tiktok_callback(account_id: str, code: str, db: Session = Depends(get_db)):
    account = db.query(SocialAccount).filter(SocialAccount.id == account_id).first()
    if account:
        account.tiktok_access_token = f"real_tk_token_for_{code}"
        db.commit()
    return RedirectResponse(url=f"{FRONTEND_URL}/automations?auth=tiktok_success")

# --- Instagram OAuth ---
@router.get("/instagram/login")
def instagram_login(account_id: str):
    callback_url = f"http://localhost:8000/api/auth/instagram/callback?account_id={account_id}&code=mock_ig_code"
    return RedirectResponse(url=callback_url)

@router.get("/instagram/callback")
def instagram_callback(account_id: str, code: str, db: Session = Depends(get_db)):
    account = db.query(SocialAccount).filter(SocialAccount.id == account_id).first()
    if account:
        account.instagram_access_token = f"real_ig_token_for_{code}"
        db.commit()
    return RedirectResponse(url=f"{FRONTEND_URL}/automations?auth=instagram_success")
