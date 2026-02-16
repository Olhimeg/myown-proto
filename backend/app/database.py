import os
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from pydantic_settings import BaseSettings, SettingsConfigDict
from app.models.task import Task


class Settings(BaseSettings):
    mongodb_url: str
    database_name: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",           # игнорирует лишние переменные в .env
    )


settings = Settings()

client: Optional[AsyncIOMotorClient] = None


async def init_db():
    global client
    client = AsyncIOMotorClient(settings.mongodb_url)

    try:
        await client.admin.command('ping')
        print("MongoDB: ping OK (соединение установлено)")
    except Exception as e:
        print(f"MongoDB: ping FAILED → {e}")
        raise

    await init_beanie(
        database=client[settings.database_name],
        document_models=[Task]  # ← добавь здесь [Task]
    )
    print(f"MongoDB подключена: {settings.database_name}")


async def close_db():
    global client
    if client is not None:
        client.close()
        print("MongoDB: соединение закрыто")
        client = None