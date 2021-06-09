from pydantic import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    
    API_KEY_TEST: str = os.getenv('API_KEY_TEST')
    AUTH_DOMAIN_TEST: str = os.getenv('AUTH_DOMAIN_TEST')
    DATABASE_URL_TEST: str = os.getenv('DATABASE_URL_TEST')
    PROJECT_ID_TEST: str = os.getenv('PROJECT_ID_TEST')
    STORAGE_BUCKET_TEST: str = os.getenv('STORAGE_BUCKET_TEST')
    MESSAGING_SENDER_ID_TEST: str = os.getenv('MESSAGING_SENDER_ID_TEST')
    APP_ID_TEST: str = os.getenv('APP_ID_TEST')
    MEASUREMENT_ID_TEST: str = os.getenv('MEASUREMENT_ID_TEST')

    class Config:
        env_file = ".env"