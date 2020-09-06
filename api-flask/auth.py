from api.models import User
from api.models import bcrypt
from flask import Blueprint, request, make_response, jsonify


auth_blueprint = Blueprint('auth' , __name__)

def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return user

def identity(payload):
    user_id = payload['identity']
    return User.query.get(user_id)
