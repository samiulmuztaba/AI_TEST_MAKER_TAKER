import models
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine

models.Base.metadata.create_all(bind=engine) # Create tables :)

# ====== Setup and middleware stuff ========
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)