from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Response, Form
from typing import Optional
import main

router = APIRouter()
class Gems(BaseModel):
    gemID: Optional[str] = ""
    token: Optional[str] = ""
    ownerID: Optional[str] = ""
    audioURL: Optional[str] = ""
    title: Optional[str] = ""
    description: Optional[str] = "" 
    categories: Optional[list] = []
    explicit: Optional[bool] = False

@router.post("/api/post/gems/")
def post_gems_(gem: Gems):
    main.database.child("GEMS").push({
        "ownerID": gem.ownerID,
        "audioURL": gem.audioURL,
        "title": gem.title,
        "description": gem.description,
        "categories": gem.categories,
        "explicit": gem.explicit
    }, gem.token)
    return "GEM ADDED"
  
@router.get("/api/get/gems/")
def get_gems_by_user(gem:Gems):
    array_of_user_gems = []
    all_gems = main.database.child("GEMS").get(gem.token)
    for x in all_gems.pyres:
        if x.item[1]["ownerID"] == gem.ownerID:
            array_of_user_gems.append(x.item)
    return array_of_user_gems


@router.post("/api/remove/gem/")
async def remove_gem(gem: Gems):
    main.database.child("GEMS").child(gem.gemID).remove(gem.token)
    return "Gem removed"

@router.put("/api/update/gem/")
async def update_gem(gem: Gems):
    updated_gem = main.database.child("GEMS").child(gem.gemID).update({
        "ownerID": gem.ownerID,
        "audioURL": gem.audioURL,
        "title": gem.title,
        "description": gem.description,
        "categories": gem.categories,
        "explicit": gem.explicit
    },gem.token)
    print(gem.token)
    return "Gem updated"