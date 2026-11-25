
"""
Artemis API entry point.

Initializes the FastAPI application, configures middleware
and defines the API endpoints.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Artemis API",
    description="Backend API for the Artemis application",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "application": "Artemis"}
