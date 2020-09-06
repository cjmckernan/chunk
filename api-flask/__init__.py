import os
from flask import Flask
from flask_jwt import JWT
from flask_cors import CORS
from flask_migrate import Migrate
from api import auth
from api.models import User

cors = CORS()

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
SECRET_KEY='super-secret',
DATABASE=os.getcwd()+'/chunk.sqlite3',
SQLALCHEMY_DATABASE_URI='sqlite:///'+os.getcwd()+'/chunk.sqlite3',
SQLALCHEMY_TRACK_MODIFICATIONS=False,
SQLALCHEMY_ECHO=False
)

##Brcrypt
from api.models import bcrypt
bcrypt.init_app(app)

##Allow cors
cors.init_app(app)

##Setup JWT
jwt = JWT(app, auth.authenticate, auth.identity)

#Init db
from api.db import db
db.init_app(app)
migrate = Migrate(app, db)
from api.models import User
migrate.init_app(app,db)

from api.api import api_blueprint
app.register_blueprint(api_blueprint)

    
    

    
    




    