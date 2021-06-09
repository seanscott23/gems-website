from pydantic import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    
    API_KEY_TEST: str = os.getenv.get('API_KEY_TEST')
    AUTH_DOMAIN_TEST: str = os.getenv.get('AUTH_DOMAIN_TEST')
    DATABASE_URL_TEST: str = os.getenv.get('DATABASE_URL_TEST')
    PROJECT_ID_TEST: str = os.getenv.get('PROJECT_ID_TEST')
    STORAGE_BUCKET_TEST: str = os.getenv.get('STORAGE_BUCKET_TEST')
    MESSAGING_SENDER_ID_TEST: str = os.getenv.get('MESSAGING_SENDER_ID_TEST')
    APP_ID_TEST: str = os.getenv.get('APP_ID_TEST')
    MEASUREMENT_ID_TEST: str = os.getenv.get('MEASUREMENT_ID_TEST')

    class Config:
        env_file = ".env"