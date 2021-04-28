from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Response, Form
import main

router = APIRouter()
class Gems(BaseModel):
    gemID: str
    token: str
    ownerID: str
    audioURL: str
    title: str
    description: str
    categories: list
    explicit: bool

@router.post("/api/post/gems/")
def post_gems_(gem: Gems):
    main.database.child("GEMS").push({
        "ownerID": gem.ownerID,
        "audioURL": gem.audioURL,
        "title": gem.title,
        "description": gem.description,
        "categories": [gem.categories],
        "explicit": gem.explicit
    }, gem.token)
    return "GEM ADDED"
  
@router.post("/api/get/gems/")
def get_gems_by_user(gem:Gems):
    array_of_user_gems = []
    all_gems = main.database.child("GEMS").get(gem.token)
    for x in all_gems.pyres:
        print(x.item[1]["ownerID"])
        if x.item[1]["ownerID"] == gem.ownerID:
            array_of_user_gems.append(x.item)
    return array_of_user_gems