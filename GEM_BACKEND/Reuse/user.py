from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Response, Form, HTTPException
from typing import Optional
from datetime import datetime
import main
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

router = APIRouter()

class User(BaseModel):
    userID: Optional[str] = ""
    email: Optional[str] = ""
    name: Optional[str] = ""
    time_created: Optional[str] = ""
    image_url: Optional[str] = ""
    password: Optional[str] = ""

@router.post("/api/signup/createuser")
def create_user(user: User):
    try:
        user_created = main.auth.create_user_with_email_and_password(user.email, user.password)
        main.auth.send_email_verification(user_created['idToken'])
        return user_created
    except:
       return "User already exists"

@router.post("/api/signup/userinfo")
async def post_user(user:User):
    user_id = create_user(user)
    now = datetime.now()
    print(user_id)
    main.database.child("USERS").child(user_id["localId"]).set({
        "userID": user_id["localId"],
        "email": user.email,
        "name": user.name,
        "image_url": user.image_url,
        "time_created": datetime.timestamp(now)
    }, user_id["idToken"])
    return "User info added"


@router.post("/api/deliver/userImage/")
async def add_user_image_to_db_return_url(user_image:UploadFile = File(...), user_id:str = Form(...), token:str = Form(...)):
    try:
        main.storage.child("USERPHOTO").child(user_id).put(user_image.file, token)
        return main.storage.child("USERPHOTO").child(user_id).get_url(token)
    except:
        print("Unable to upload user image")

    return ""

@router.post("/api/signin/")
async def sign_in_user(user: User):
    try:
        user = main.auth.sign_in_with_email_and_password(user.email, user.password)
        return user
    except:
        return "Either incorrect credentials or user doesn't exist"

@router.get("/api/get/userData/{user_id}")
async def get_user_data(user_id: str):
    try:
       return main.database.child("users").child(user_id).get().val()
    except:
        print("Unable to return user info")

    return "Unable to find user"