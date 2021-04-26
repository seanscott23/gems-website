
from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Response, Form
import main

router = APIRouter()
class Gems(BaseModel):
    ownerID: str
    title: str
    description: str
    audioUrl: str
    isExplict: bool


@router.post("/api/post/gems/")
def get_gems_by_user():
   main.database.child()
  
@router.get("/api/get/gems/{userID}/")
def get_gems_by_user(userID:str):
    return main.database.child(userID)