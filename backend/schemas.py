from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class RegistrationReq(BaseModel):
    username: str
    email: str
    password: str


class LoginReq(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True
