import flask, json, os, uuid
from flask import Blueprint, request



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

@api_blueprint.route('/test', methods=['POST'])
def test():
    content = request.json
    print(content['test'])
    return flask.jsonify(hello='world')

@api_blueprint.route('/list', methods=['GET'])
def get_list_directory():
    return flask.jsonify(get_directory_system(default_dir))


@api_blueprint.route('/directory', methods=['POST'])
def get_directory():
    content = request.json
    print(content)
    return flask.jsonify(get_directory_system(default_dir+'/'+content['directory']))


##Validation needs to be done on incoming string
@api_blueprint.route('/extract', methods=['POST'])
def extract():
    content = request.json
    print(content)
    os.system('unrar e'+default_dir+'/'+content['directory'])
    return flask.jsonify(Status='Ok')