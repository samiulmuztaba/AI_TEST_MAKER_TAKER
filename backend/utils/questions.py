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

def get_question_category_by_id(q_id: str):
    for category in load_questions().values():
        if isinstance(category, list):
            for q in category:
                if q.get('id') == q_id:
                    for key in load_questions().keys():
                        if load_questions()[key] == category:
                            return key

# print(load_questions())

# print(get_question_category_by_id('gf_001'))