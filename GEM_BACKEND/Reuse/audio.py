from pydantic import BaseModel
from fastapi import APIRouter, File, UploadFile, Response, Form
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydub import AudioSegment
import requests
import main
from io import BytesIO, StringIO
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
async def post_mp3_audio(file:UploadFile = Form(...), userID:str = Form(...), token:str = Form(...), begin:str = Form(...), end:str = Form(...) ):
    token = token
    userID = userID
    begin = float(begin) * 1000
    end = float(end) * 1000
    
    file_from_client = file.file
    original = AudioSegment.from_file(file_from_client)
    section = original[begin:end]
    buf = BytesIO()
    section.export(buf, format="mp3")
    sendAudioToStorage("43", buf, userID, token)
    return {"trimmed_audio_url": get_audio(userID, "43", token)} 
    #don't forget to put warning for non updated chrome browser.
