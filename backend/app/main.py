
from fastapi import FastAPI

app = FastAPI(
    title="Artemis API",
    description="Backend API for the Artemis application",
    version="0.1.0",
)


@app.get("/health")
def health_check():
    return {"status": "ok", "application": "Artemis"}
