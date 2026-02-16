from typing import List
import models
from fastapi import FastAPI, Depends, HTTPException  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
import schemas
from sqlalchemy.orm import Session  # type: ignore
from sqlalchemy.orm.attributes import flag_modified  # type: ignore
from database import engine, get_db
from passlib.context import CryptContext  # type: ignore
from datetime import datetime
import random
from utils.questions import load_questions, get_question_by_id, get_question_category_by_id

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
        db.query(models.User).filter(models.User.username == user.username).first()
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
        created_at=user_exists.created_at,
    )


@app.get("/api/users", response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@app.get("/api/users/{user_id}", response_model=schemas.UserResponse)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="The user is not found")
    return user


# ======== Skill stuff =========
@app.post("/api/answer")
def check_answer(ans_req: schemas.AnswerRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == ans_req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User doesn't exist")

    # Load actual question from JSON
    from utils.questions import get_question_by_id
    question = get_question_by_id(ans_req.question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Get correct answer from question
    correct_answer = question["answer"]
    is_correct = ans_req.user_answer.strip().lower() == correct_answer.lower()
    
    # Get topic and subtype from question
    topic = get_question_category_by_id(ans_req.question_id)      
    type = question["type"]          
    
    user_skills = user.skills
    
    # Initialize nested structure if needed
    if topic not in user_skills["performance"]:
        user_skills["performance"][topic] = {}
    
    if type not in user_skills["performance"][topic]:
        user_skills["performance"][topic][type] = {
            "correct": 1 if is_correct else 0,
            "total": 1,
            "score": 100 if is_correct else 0,
            "last_practiced": datetime.utcnow().isoformat(),
        }
    else:
        perf = user_skills["performance"][topic][type]
        perf["total"] += 1
        if is_correct:
            perf["correct"] += 1
        perf["score"] = (perf["correct"] / perf["total"]) * 100
        perf["last_practiced"] = datetime.utcnow().isoformat()

    # Recalculate overall_level
    all_scores = [
        subtype_perf["score"]
        for topic_data in user_skills["performance"].values()
        for subtype_perf in topic_data.values()
    ]
    user_skills["overall_level"] = sum(all_scores) / len(all_scores) if all_scores else 0

    flag_modified(user, "skills")
    db.commit()

    return {
        "correct": is_correct,
        "answer": correct_answer,
        "explanation": question.get("explanation", {}),  # Return explanation too!
        "new_overall_level": user_skills["overall_level"]
    }


@app.get('/api/practice/tag-questions')
def get_tag_questions(user_id: str, db: Session = Depends(get_db)):
    """Get tag questions based on weak types"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    questions_db = load_questions()
    tag_questions = questions_db['tag_questions']

    weak_on = []
    if "tag_questions" in user.skills.get('performance', {}):
        for subtype, perf in user.skills['performance']['tag_questions'].items():
            if perf['score'] < 60:
                weak_on.append(subtype)

        selected = []
        
        for q in tag_questions:
            if q['type'] in weak_on and len(selected) <= 5:
                selected.append(q)
        if len(selected) == 0:
            return {"No need!"}

    else:
        return {'questions': tag_questions}

    return {"questions": selected[:5]}