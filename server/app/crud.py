from sqlalchemy.orm import Session

from . import models, schemas

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(firstname=user.firstname, lastname=user.lastname, phone=user.phone)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user