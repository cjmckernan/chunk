from flask_bcrypt import Bcrypt
from api.db import db



bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(128))

    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.generate_password_hash(password)


    def __repr__(self):
        return f'<User {{ username: {self.username}, password: {self.password} }}'



