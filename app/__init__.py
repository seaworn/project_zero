import os

from flask import Flask, jsonify, request, render_template, abort, url_for, redirect
from werkzeug.exceptions import HTTPException
# from flask_login import LoginManager
# from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from flask_migrate import Migrate
from flask_jwt_extended import JWTManager


# instantiate extensions
# login_manager = LoginManager()
# bootstrap = Bootstrap()
db = SQLAlchemy()
cors = CORS()
# migrate = Migrate()
jwt = JWTManager()


def create_app():

    from config import config
    from .views import main_blueprint
    from .user.views import user_blueprint
    from .user.models import User, AnonymousUser

    app = Flask(__name__, template_folder='react-build', static_folder='react-build/static')

    # set app config
    env = os.environ.get('FLASK_ENV', 'default')
    app.config.from_object(config[env])
    config[env].configure(app)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 15

    # set up extensions
    # login_manager.init_app(app)
    # bootstrap.init_app(app)
    db.init_app(app)
    # migrate.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)

    # register blueprints
    app.register_blueprint(user_blueprint)
    app.register_blueprint(main_blueprint)

    # @app.before_request
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        return render_template('index.html', app_name=app.config['APP_NAME'])

    # set up flask login.
    # @login_manager.user_loader
    # def get_user(id):
    #     return User.query.get(int(id))

    # login_manager.login_view = 'user.login'
    # login_manager.login_message_category = 'info'
    # login_manager.anonymous_user = AnonymousUser

    # Set up flask jwt.
    # @jwt.user_identity_loader
    # def load_jwt_identity(user):
    #     return user.id

    @jwt.expired_token_loader
    def handle_expired_token(token_data):
        return jsonify(token_status='expired', msg='Authorization token has expired', refresh_url=url_for('user.refresh_token')), 401

    @jwt.unauthorized_loader
    def handle_missing_token(msg):
        return jsonify(token_status='missing', msg='Authorization token is missing'), 401

    # error handlers
    @app.errorhandler(HTTPException)
    def handle_http_error(exc):
        return jsonify(msg=exc.description), exc.code

    return app
