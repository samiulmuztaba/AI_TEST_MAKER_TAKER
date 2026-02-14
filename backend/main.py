from typing import List
import models
from fastapi import FastAPI, Depends, HTTPException # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import schemas
from sqlalchemy.orm import Session # type: ignore
from database import engine, get_db
from passlib.context import CryptContext # type: ignore

models.Base.metadata.create_all(bind=engine)  # Create tables :)

# ====== Setup and middleware stuff ========
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


@app.get("/")
def read_root():
    """root endpoint"""
    return {"message": "this is roooooot!"}


@app.post("/api/users", response_model=schemas.UserResponse)
def register_user(user: schemas.RegistrationReq, db: Session = Depends(get_db)):
    username_taken = (
        db.query(models.User).filter(models.User.username == user.username).first()
    )
    email_taken = db.query(models.User).filter(models.User.email == user.email).first()
    if username_taken:
        raise HTTPException(status_code=400, detail="Username already taken")
    if email_taken:
        raise HTTPException(status_code=400, detail="Email is in use")
    
    # Hash the password before storing
    hashed_password = pwd_context.hash(user.password)
    new_user = models.User(
        username=user.username, email=user.email, password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/api/users/login", response_model=schemas.UserResponse)
def login_user(user: schemas.LoginReq, db: Session = Depends(get_db)):
    user_exists = (
        db.query(models.User)
        .filter(models.User.username == user.username)
        .first()
    )

    if not user_exists or not pwd_context.verify(user.password, user_exists.password):
        raise HTTPException(
            status_code=404,
            detail="Invalid username or password",
        )

    return schemas.UserResponse(
        id=user_exists.id,
        username=user_exists.username,
        email=user_exists.email,
        created_at=user_exists.created_at
    )


@app.get('/api/users', response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@app.get("/api/users/{user_id}", response_model=schemas.UserResponse)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="The user is not found")
    return user