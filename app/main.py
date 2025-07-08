from fastapi import FastAPI
from app.api import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Avatar Animation API')
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or "*" during dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
