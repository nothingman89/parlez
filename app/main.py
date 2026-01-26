from fastapi import FastAPI

app = FastAPI(title="Parlez", description="A translation practice app")


@app.get("/health")
async def health_check():
    return {"status": "ok"}
