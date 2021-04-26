from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydub import AudioSegment
import requests
import main
from io import BytesIO
import base64
from Reuse.Helper import Helper

router = APIRouter()

class Audio(BaseModel):
    userID: str
    token: str
    url: str
    begin: int
    end: int

@router.post("/api/deliver/audio/")
def post_audio(audioMeta: Audio):
    audio = requests.get(audioMeta.url, timeout=10)
    audioID = Helper.getAudioID(audio.url)
    original = AudioSegment.from_mp3(BytesIO(audio.content))
    begin = audioMeta.begin * 1000
    end = audioMeta.end * 1000
    section = original[begin:end]
    buf = BytesIO()
    section.export(buf, format="mp3")
    sendAudioToStorage(audioID, buf, audioMeta.userID, audioMeta.token)
    json_response = jsonable_encoder({"trimmed_audio_url": get_audio(audioMeta.userID, audioID, audioMeta.token)})
    return json_response

def sendAudioToStorage(audioID, sectionOfAudio, userID, token):
    main.storage.child(userID).child(audioID).put(sectionOfAudio, token)
    return "Delivered to storage"


@router.get("/api/receive/audio")
def get_audio(userID, audioID, token):
    return main.storage.child(userID).child(audioID).get_url(token)


@router.post("/api/deliver/mp3/audio/")
def post_mp3_audio(file_content:UploadFile = File(...)):
    print(file_content)
    sendAudioToStorage("12345", file_content.file, "12345", "34324")
    return file_content.filename



