from pydantic import BaseModel

class UserBase(BaseModel):
    firstname: str

class UserCreate(UserBase):
    lastname: str
    phone: str


class User(UserBase):
    id: int
    lastname: str
    phone: str

    class Config:
        orm_mode = True