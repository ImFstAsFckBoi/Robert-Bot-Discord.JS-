import json

template = {
    "id": None,
    "tag": None,
    "username": None,
    "name_history": [],
    "karma": 0,
    "n_word": 0,
    "n_word_pass": 0
}

with open('./assets/data/userDB.json', 'r') as f:
    profiles = json.loads(f.read())

print(profiles["bitch"])