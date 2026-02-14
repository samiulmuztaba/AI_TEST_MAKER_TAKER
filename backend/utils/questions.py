import json
from pathlib import Path

def load_questions():
    file_path = Path(__file__).parent.parent / "utils/question_bank.json"
    with open(file_path, 'r') as f:
        return json.load(f)
    
def get_question_by_id(q_id: str):
    questions = load_questions()

    for category in questions.values():
        if isinstance(category, list):
            for q in category:
                if q.get('id') == q_id:
                    return q
    return None

print(load_questions())