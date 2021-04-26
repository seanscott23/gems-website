
from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Response, Form
import main

router = APIRouter()
class Gems(BaseModel):
    gemID: str
    # token: str
    ownerID: str
    audioURL: str
    title: str
    description: str
    categories: list
    explicit: bool

@router.post("/api/post/gems/")
def post_gems_(gem: Gems):
   main.database.child("GEMS").push(gem)
   return "GEM ADDED"
  
@router.get("/api/get/gems/{userID}/")
def get_gems_by_user(ownerID:str):
    return main.database.child("GEMS").order_by_child("ownerID").equal_to(ownerID).get()