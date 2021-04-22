import main
from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()

class UserPrompt(): 
    question: str
    answer: str

    def __init__(self, question, answer):
        self.question = question
        self.answer = answer

class UserInfo(BaseModel):
    name: str
    user_key: str
    phone_number: str
    # gender: str
    # birthday: str
    # seeking_gender: str
    # min_age: str
    # max_age: str
    # height: str
    # drinker: str
    # smoker: str
    # active: str
    # birth_sign: str
    # political_party: str
    # religion: str
    # relationship_type: str
    # bio: str
    # user_prompt = []
    # user_images = []



# @router.post("/userinfo/", status_code=201)
# def addUser(userInfo: UserInfo):
#     path2DB = main.database.child("USERINFO").child(userInfo.user_key)
#     data = {"name": userInfo.name}
#     main.database.set(data)
#     return "User has been entered!"


@router.post("/userinfo/", status_code=201)
def addAUser(userInfo: UserInfo):
    data = {
        "_id": userInfo.user_key,
        "name": userInfo.name, 
        "phone_number": userInfo.phone_number
        }
    main.mycollection.insert_one(data)
    return "User has been created!"
