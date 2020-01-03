import os

from flask import Flask, jsonify, render_template, abort
from werkzeug.exceptions import HTTPException
from flask_login import LoginManager
# from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from flask_migrate import Migrate


# instantiate extensions
login_manager = LoginManager()
# bootstrap = Bootstrap()
db = SQLAlchemy()
# cors = CORS()
# migrate = Migrate()


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

    # set up extensions
    login_manager.init_app(app)
    # bootstrap.init_app(app)
    db.init_app(app)
    # migrate.init_app(app)
    # cors.init_app(app)

    # register blueprints
    app.register_blueprint(user_blueprint)
    app.register_blueprint(main_blueprint)

    # root
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        # !!! May pose potential bug of capturing all GET requests
        return render_template('index.html', app_name=app.config['APP_NAME'])

    # set up flask login
    @login_manager.user_loader
    def get_user(id):
        return User.query.get(int(id))

    login_manager.login_view = 'user.login'
    login_manager.login_message_category = 'info'
    login_manager.anonymous_user = AnonymousUser

    # error handlers
    @app.errorhandler(HTTPException)
    def http_error_handler(exc):
        return jsonify(exc=[exc.code, exc.name, exc.description]), exc.code

    return app
