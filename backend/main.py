from typing import List
import models
from fastapi import FastAPI, Depends, HTTPException  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
import schemas
from sqlalchemy.orm import Session  # type: ignore
from sqlalchemy.orm.attributes import flag_modified  # type: ignore
from database import engine, get_db
from passlib.context import CryptContext  # type: ignore
from datetime import datetime, timedelta
import random
from utils.questions import load_questions, get_question_by_id, get_question_category_by_id

models.Base.metadata.create_all(bind=engine)

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

TOPIC_KEY_MAP = {
    "tag_questions":      "tag_questions",
    "gap_filling":        "gap_filling",
    "substitution_table": "substitution_table",
    "right_form_verbs":   "right_form_verbs",
}


# ============================================================
# ROOT
# ============================================================
@app.get("/")
def read_root():
    return {"message": "this is roooooot!"}


# ============================================================
# AUTH
# ============================================================
@app.post("/api/users", response_model=schemas.UserResponse)
def register_user(user: schemas.RegistrationReq, db: Session = Depends(get_db)):
    username_taken = db.query(models.User).filter(models.User.username == user.username).first()
    email_taken    = db.query(models.User).filter(models.User.email == user.email).first()
    if username_taken:
        raise HTTPException(status_code=400, detail="Username already taken")
    if email_taken:
        raise HTTPException(status_code=400, detail="Email is in use")

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
    user_exists = db.query(models.User).filter(models.User.username == user.username).first()

    if not user_exists or not pwd_context.verify(user.password, user_exists.password):
        raise HTTPException(status_code=404, detail="Invalid username or password")

    return schemas.UserResponse(
        id=user_exists.id,
        username=user_exists.username,
        email=user_exists.email,
        created_at=user_exists.created_at,
    )


@app.get("/api/users", response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.get("/api/users/{user_id}", response_model=schemas.UserResponse)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="The user is not found")
    return user


# ============================================================
# ANSWER CHECKING
# ============================================================
@app.post("/api/answer")
def check_answer(ans_req: schemas.AnswerRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == ans_req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User doesn't exist")

    question = get_question_by_id(ans_req.question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    correct_answer = question["answer"]
    is_correct     = ans_req.user_answer.strip().lower() == correct_answer.lower()

    topic    = get_question_category_by_id(ans_req.question_id)
    subtype  = question["type"]

    user_skills = user.skills

    if topic not in user_skills["performance"]:
        user_skills["performance"][topic] = {}

    if subtype not in user_skills["performance"][topic]:
        user_skills["performance"][topic][subtype] = {
            "correct":            1 if is_correct else 0,
            "total":              1,
            "score":              100 if is_correct else 0,
            "last_practiced":     datetime.utcnow().isoformat(),
            "interval_days":      7,
            "consecutive_perfect": 0,
        }
    else:
        perf = user_skills["performance"][topic][subtype]
        perf["total"] += 1
        if is_correct:
            perf["correct"] += 1
        perf["score"]          = (perf["correct"] / perf["total"]) * 100
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
        "correct":           is_correct,
        "answer":            correct_answer,
        "explanation":       question.get("explanation", {}),
        "new_overall_level": user_skills["overall_level"]
    }


# ============================================================
# PRACTICE — HELPERS
# ============================================================
def select_questions_from_subtypes(all_questions, target_subtypes, count):
    """
    Pull `count` questions prioritizing target_subtypes.
    If target_subtypes is empty (topic has no subtypes), treats all questions equally.
    """
    if target_subtypes:
        priority = [q for q in all_questions if q.get('type') in target_subtypes]
        others   = [q for q in all_questions if q.get('type') not in target_subtypes]
    else:
        priority = all_questions
        others   = []

    selected = priority[:count]
    if len(selected) < count:
        needed   = count - len(selected)
        selected += random.sample(others, min(needed, len(others)))

    random.shuffle(selected)
    return selected


# ============================================================
# PRACTICE — GET QUESTIONS
# GET /api/practice/questions?topic=tag_questions&user_id=X
# ============================================================
@app.get('/api/practice/questions')
def get_practice_questions(topic: str, user_id: str, db: Session = Depends(get_db)):
    if topic not in TOPIC_KEY_MAP:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown topic '{topic}'. Valid: {list(TOPIC_KEY_MAP.keys())}"
        )

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    questions_db    = load_questions()
    topic_questions = questions_db.get(TOPIC_KEY_MAP[topic], [])
    performance     = user.skills.get('performance', {}).get(topic, {})
    now             = datetime.utcnow()

    # ── No performance data yet → 5 random questions ──────────────────────
    if not performance:
        return {
            "questions": random.sample(topic_questions, min(5, len(topic_questions))),
            "mode":      "random"
        }

    # ── Sort subtypes by score ascending ──────────────────────────────────
    sorted_subtypes = sorted(performance.items(), key=lambda x: x[1]['score'])

    # ── CASE 1: Weak subtypes exist (score < 60) ──────────────────────────
    weak_subtypes = [s for s, p in sorted_subtypes if p['score'] < 60]

    if weak_subtypes:
        all_weak = len(weak_subtypes) == len(sorted_subtypes)
        count    = 10 if all_weak else 5
        return {
            "questions": select_questions_from_subtypes(topic_questions, weak_subtypes, count),
            "mode":      "weakness",
            "count":     count
        }

    # ── CASE 2: Average exists — return the ones between 60-75 ──────────────────────
    avg_subtypes = [s for s, p in sorted_subtypes if p['score'] >= 60 and p['score'] <= 75]
    if avg_subtypes:
        return {
            "questions" : select_questions_from_subtypes(topic_questions, avg_subtypes, len(avg_subtypes)),
            "mode": "avg",

        }
    print(avg_subtypes)
    # ── CASE 3: All strong — check spaced repetition ──────────────────────
    if not avg_subtypes:
        overdue_subtypes = []
        for subtype, perf in sorted_subtypes:
            interval_days  = perf.get('interval_days', 7)
            last_practiced = perf.get('last_practiced')
            if last_practiced:
                last_dt  = datetime.fromisoformat(last_practiced)
                due_date = last_dt + timedelta(days=interval_days)
                if now >= due_date:
                    overdue_subtypes.append((subtype, due_date))

        if overdue_subtypes:
            overdue_subtypes.sort(key=lambda x: x[1])   # most overdue first
            target = [s for s, _ in overdue_subtypes]
            return {
                "questions": select_questions_from_subtypes(topic_questions, target, 5),
                "mode":      "spaced_repetition"
            }

    # ── CASE 4: All strong AND all recently practiced ─────────────────────
    return {"message": "No need!"}


# ============================================================
# PRACTICE — COMPLETE SESSION
# POST /api/practice/complete?user_id=X&topic=Y&session_correct=N&session_total=M
# ============================================================
@app.post('/api/practice/complete')
def complete_practice_session(
    user_id:         str,
    topic:           str,
    session_correct: int,
    session_total:   int,
    db: Session = Depends(get_db)
):
    if topic not in TOPIC_KEY_MAP:
        raise HTTPException(status_code=400, detail=f"Unknown topic '{topic}'")

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    session_score = (session_correct / session_total) * 100 if session_total > 0 else 0
    performance   = user.skills.get('performance', {}).get(topic, {})

    for subtype, perf in performance.items():
        interval_days       = perf.get('interval_days', 7)
        consecutive_perfect = perf.get('consecutive_perfect', 0)

        if session_score == 100:
            consecutive_perfect += 1
            if consecutive_perfect >= 2:
                interval_days = min(interval_days * 2, 90)   # cap at 90 days
        elif session_score < 60:
            consecutive_perfect = 0
            interval_days       = 7                           # reset to weekly

        perf['interval_days']        = interval_days
        perf['consecutive_perfect']  = consecutive_perfect

    flag_modified(user, "skills")
    db.commit()

    return {
        "session_score":     session_score,
        "updated_intervals": {s: p['interval_days'] for s, p in performance.items()},
    }