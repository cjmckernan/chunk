import os
from flask import Flask
from flask_cors import CORS

cors = CORS()

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
SECRET_KEY='super-secret',
DATABASE=os.getcwd()+'/chunk.sqlite3',
SQLALCHEMY_DATABASE_URI='sqlite:///'+os.getcwd()+'/chunk.sqlite3',
SQLALCHEMY_TRACK_MODIFICATIONS=False,
SQLALCHEMY_ECHO=False
)

##Allow cors
cors.init_app(app)

from unrar.api import api_blueprint
app.register_blueprint(api_blueprint)

    
    

    
    




    