from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.database import init_db, close_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("STARTUP: начинаем подключение к MongoDB...")
    await init_db()
    print("STARTUP: lifespan завершён успешно")
    yield
    await close_db()
    print("SHUTDOWN: MongoDB закрыта")


app = FastAPI(
    title="Multitool Hub Backend",
    lifespan=lifespan,  # ← здесь lifespan должен быть указан!
)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

from app.routers.debug import router as debug_router

app.include_router(debug_router)