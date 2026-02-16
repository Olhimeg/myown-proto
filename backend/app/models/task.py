# backend/app/models/task.py
from beanie import Document, Indexed
from datetime import datetime
from typing import List, Optional
from pydantic import Field
from enum import Enum


class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class Task(Document):
    stand_id: Indexed(str)               # ID стенда (например "STAND-001")
    command: str                         # "reboot", "git checkout feature/x", "run test.py --args"
    params: dict = Field(default_factory=dict)  # дополнительные параметры
    status: TaskStatus = TaskStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    logs: List[str] = []                 # массив строк логов

    class Settings:
        name = "tasks"                   # имя коллекции в MongoDB