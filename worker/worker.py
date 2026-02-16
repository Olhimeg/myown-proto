# worker/worker.py
import asyncio
import time
from datetime import datetime, timezone
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from pydantic_settings import BaseSettings, SettingsConfigDict

# Импорт модели Task из backend (относительный путь или через sys.path)
# Вариант 1: если запускаешь из корня — добавь в PYTHONPATH
# Вариант 2: пока используем абсолютный импорт или копируем модель
# Для простоты пока скопируем минимальную модель сюда (потом переделаем на общий пакет)

from enum import Enum
from pydantic import Field

db = None

class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class Task:
    # Минимальная копия модели (потом сделаем общий модуль)
    id: str
    stand_id: str
    command: str
    params: dict = Field(default_factory=dict)
    status: TaskStatus = TaskStatus.PENDING
    created_at: datetime
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    logs: list[str] = []

    async def save(self):
        # Заглушка — в реальности здесь будет Beanie .save()
        print(f"[SAVE] {self.id} updated to {self.status}")


class WorkerSettings(BaseSettings):
    mongodb_url: str
    database_name: str = "multitool"
    stand_id: str = "MY_COMP"
    poll_interval_sec: float = 5.0

    model_config = SettingsConfigDict(
        env_file="../.env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = WorkerSettings()

client: Optional[AsyncIOMotorClient] = None


async def init_worker():
    global client, db
    client = AsyncIOMotorClient(settings.mongodb_url)

    try:
        await client.admin.command('ping')
        print(f"[{settings.stand_id}] ping MongoDB OK")
    except Exception as e:
        print(f"[{settings.stand_id}] ping FAILED → {e}")
        raise

    db = client[settings.database_name]
    print(f"[{settings.stand_id}] Worker готов к работе")


async def shutdown_worker():
    global client
    if client:
        client.close()
        print(f"[{settings.stand_id}] MongoDB закрыта")


async def run_task(task):
    print(f"[{settings.stand_id}] [{task.id}] Запуск: {task.command}")

    task.status = TaskStatus.RUNNING
    task.started_at = datetime.now(timezone.utc)
    await task.save()  # заглушка

    logs = []
    success = True

    try:
        if task.command == "reboot":
            logs.append("Симуляция перезагрузки стенда...")
            await asyncio.sleep(2)

        elif task.command.startswith("git checkout"):
            branch = task.params.get("branch", "main")
            logs.append(f"Симуляция checkout на {branch}")
            await asyncio.sleep(1)

        else:
            logs.append(f"Неизвестная команда: {task.command}")
            success = False

    except Exception as e:
        logs.append(f"Ошибка: {str(e)}")
        success = False

    task.logs.extend(logs)
    task.finished_at = datetime.now(timezone.utc)
    task.status = TaskStatus.COMPLETED if success else TaskStatus.FAILED
    await task.save()

    print(f"[{settings.stand_id}] [{task.id}] Завершено: {task.status}")


async def main_loop():
    await init_worker()

    print(f"[{settings.stand_id}] Worker запущен. Опрос каждые {settings.poll_interval_sec} сек.")

    try:
        while True:
            # Реальный запрос: берём самую старую PENDING задачу для этого стенда
            task_doc = await db.tasks.find_one({
                "stand_id": settings.stand_id,
                "status": "pending"
            }, sort=[("created_at", 1)])  # 1 = ascending, самая старая первой

            if task_doc:
                task_id = task_doc["_id"]
                print(f"[{settings.stand_id}] Найдена задача {task_id}: {task_doc['command']}")

                # Обновляем статус на RUNNING
                await db.tasks.update_one(
                    {"_id": task_id},
                    {"$set": {
                        "status": "running",
                        "started_at": datetime.now(timezone.utc)
                    }}
                )

                logs = []
                success = True

                try:
                    # Здесь твоя реальная логика выполнения
                    command = task_doc["command"]
                    params = task_doc.get("params", {})

                    if command == "reboot":
                        logs.append("Перезагрузка стенда запущена...")
                        # subprocess.run(["shutdown", "/r", "/t", "0"])  # реальный reboot
                        await asyncio.sleep(2)  # симуляция
                        logs.append("Reboot выполнен")

                    elif command.startswith("git checkout"):
                        branch = params.get("branch", "main")
                        logs.append(f"Переключение на ветку {branch}")
                        # subprocess.run(["git", "checkout", branch], cwd=твой_путь_к_репо)
                        await asyncio.sleep(1)
                        logs.append("Checkout выполнен")

                    else:
                        logs.append(f"Команда не поддерживается: {command}")
                        success = False

                except Exception as e:
                    logs.append(f"Ошибка выполнения: {str(e)}")
                    success = False

                # Обновляем результат в базе
                await db.tasks.update_one(
                    {"_id": task_id},
                    {"$set": {
                        "status": "completed" if success else "failed",
                        "finished_at": datetime.now(timezone.utc),
                        "logs": logs
                    }}
                )

                print(f"[{settings.stand_id}] Задача {task_id} завершена: {'completed' if success else 'failed'}")

            else:
                print(f"[{settings.stand_id}] Нет новых задач")

            await asyncio.sleep(settings.poll_interval_sec)

    except KeyboardInterrupt:
        print(f"[{settings.stand_id}] Worker остановлен")
    finally:
        await shutdown_worker()


if __name__ == "__main__":
    asyncio.run(main_loop())