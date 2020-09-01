import flask, json, os, uuid
from flask import Blueprint, request
from flask_jwt import jwt_required
from api.db import db
from api.models import User


api_blueprint = Blueprint('api', __name__)
#Add config for configuring
default_dir = '<your_default_dir>'

def convert_to_json_list(directory_list):
    converted = []
    for dir in directory_list:
        converted.append({'directory': dir, 'id': uuid.uuid4().int & (1<<64)-1})
    return converted

def get_directory_system(directory_uri):
    return convert_to_json_list(os.listdir(directory_uri))

#Add config for enabling and disabling register
#@api_blueprint.route('/register', methods=['POST'])
def register():
    content = request.json
    username = content['username']
    password = content['password']
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return flask.jsonify(Its='good yo')


@api_blueprint.route('/test', methods=['POST'])
@jwt_required()
def test():
    content = request.json
    print(content['test'])
    return flask.jsonify(hello='world')

@api_blueprint.route('/list', methods=['GET'])
@jwt_required()
def get_list_directory():
    return flask.jsonify(get_directory_system(default_dir))


@api_blueprint.route('/directory', methods=['POST'])
@jwt_required()
def get_directory():
    content = request.json
    print(content)
    return flask.jsonify(get_directory_system(default_dir+'/'+content['directory']))


##Validation needs to be done on incoming string
@api_blueprint.route('/extract', methods=['POST'])
@jwt_required()
def extract():
    content = request.json
    print(content)
    os.system('unrar e'+default_dir+'/'+content['directory'])
    return flask.jsonify(Status='Ok')