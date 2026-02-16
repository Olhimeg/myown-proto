# backend/app/routers/debug.py
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Query
from app.models.task import Task, TaskStatus
from typing import List, Optional
from beanie import PydanticObjectId

router = APIRouter(prefix="/debug", tags=["debug"])


@router.post("/tasks", response_model=Task, status_code=201)
async def create_task(task: Task):
    """
    Создать новую задачу для стенда (для debug-консоли и воркера)
    """
    task.status = TaskStatus.PENDING
    task.created_at = datetime.now(timezone.utc)
    await task.insert()
    return task


@router.get("/tasks", response_model=List[Task])
async def get_tasks(
    stand_id: Optional[str] = Query(None, description="Фильтр по ID стенда"),
    status: Optional[TaskStatus] = Query(None, description="Фильтр по статусу"),
    limit: int = Query(50, ge=1, le=500, description="Максимальное количество задач"),
    skip: int = Query(0, ge=0, description="Пропустить первые N задач"),
):
    """
    Получить список задач с фильтрами и пагинацией
    """
    query = {}

    if stand_id:
        query["stand_id"] = stand_id

    if status:
        query["status"] = status

    tasks = await Task.find(query).sort(-Task.created_at).skip(skip).limit(limit).to_list()

    if not tasks:
        return []

    return tasks


@router.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: PydanticObjectId):
    """
    Получить одну задачу по ID
    """
    task = await Task.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    return task