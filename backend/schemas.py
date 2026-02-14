from datetime import datetime
from pydantic import BaseModel # type: ignore
from typing import Optional, Dict, Any


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
    skills: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
