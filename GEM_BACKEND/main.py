from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from routers import userinfo
from Reuse import audio
import config
import pyrebase
import pymongo
from fastapi.middleware.cors import CORSMiddleware
from Reuse import gems
from Reuse import user

settings = config.Settings()
app = FastAPI()


origins = [
  "http://localhost:3000/*",
  "http://localhost:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(userinfo.router)
app.include_router(audio.router)
app.include_router(gems.router)
app.include_router(user.router)

# firebaseConfig = {
#   "apiKey": settings.API_KEY_TEST,
#   "authDomain": settings.AUTH_DOMAIN_TEST,
#   "databaseURL": settings.DATABASE_URL_TEST,
#   "projectId": settings.PROJECT_ID_TEST,
#   "storageBucket": settings.STORAGE_BUCKET_TEST,
#   "messagingSenderId": settings.MESSAGING_SENDER_ID_TEST,
#   "appId": settings.APP_ID_TEST,
#   "measurementId": settings.MEASUREMENT_ID_TEST
# };

firebaseConfig = {
  "apiKey": settings.API_KEY_TEST,
  "authDomain": settings.AUTH_DOMAIN_TEST,
  "databaseURL": settings.DATABASE_URL_TEST,
  "projectId": settings.PROJECT_ID_TEST,
  "storageBucket": settings.STORAGE_BUCKET_TEST,
  "messagingSenderId": settings.MESSAGING_SENDER_ID_TEST,
  "appId": settings.APP_ID_TEST,
  "measurementId": settings.MEASUREMENT_ID_TEST
};



firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()
database = firebase.database()
auth = firebase.auth()


