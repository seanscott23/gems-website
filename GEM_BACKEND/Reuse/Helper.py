from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

class Helper():
    
    def getAudioID(self, audioUrl):
        audioUrlList = audioUrl.split("/")
        return audioUrlList[3]