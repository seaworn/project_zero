from flask import Blueprint, request, jsonify, abort
# from flask_login import login_user, logout_user, login_required
from flask_jwt_extended import create_access_token, jwt_required, create_refresh_token, jwt_refresh_token_required, get_jwt_identity

from .models import User
from .forms import LoginForm, RegistrationForm


user_blueprint = Blueprint('user', __name__, url_prefix='/api')


@user_blueprint.route('/register', methods=['POST'])
def register():
    form = RegistrationForm(data=request.get_json())
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data, password=form.password.data)
        user.save()
        token = create_access_token(user.id)
        # login_user(user)
        return jsonify(username=user.username, access_token=token, logged_in=True, message='Registration successful. You are logged in.')
    return jsonify(validation_error=True, errors=form.errors, logged_in=False)


@user_blueprint.route('/login', methods=['POST'])
def login():
    form = LoginForm(data=request.get_json())
    if form.validate_on_submit():
        user = User.authenticate(form.userId.data, form.password.data)
        if user is not None:
            # login_user(user)
            access_token = create_access_token(user.id)
            refresh_token = create_refresh_token(user.id)
            return jsonify(username=user.username, access_token=access_token, refresh_token=refresh_token, logged_in=True, message='Login successful.')
        return jsonify(authentication_error=True, message='Wrong user ID or password.', logged_in=False)
    return jsonify(validation_error=True, errors=form.errors, logged_in=False)


@user_blueprint.route('/logout')
@jwt_required
def logout():
    # logout_user()
    return jsonify(logged_in=False, message='You have been logged out.')


@user_blueprint.route('/refresh-token')
@jwt_refresh_token_required
def refresh_token():
    identity = get_jwt_identity()
    return jsonify(refresh_token=create_access_token(identity))
