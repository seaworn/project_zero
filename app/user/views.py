from flask import render_template, Blueprint, url_for, redirect, flash, request, jsonify, abort
from flask_login import login_user, logout_user, login_required

from .models import User
from .forms import LoginForm, RegistrationForm


user_blueprint = Blueprint('user', __name__, url_prefix='/api')


@user_blueprint.route('/register', methods=['POST'])
def register():
    form = RegistrationForm(data=request.get_json())
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data, password=form.password.data)
        user.save()
        login_user(user)
        return jsonify(username=user.username, logged_in=True, message='Registration successful. You are logged in.')
    return jsonify(validation_error=True, errors=form.errors, logged_in=False)


@user_blueprint.route('/login', methods=['POST'])
def login():
    form = LoginForm(data=request.get_json())
    if form.validate_on_submit():
        user = User.authenticate(form.user_id.data, form.password.data)
        if user is not None:
            login_user(user)
            return jsonify(username=user.username, logged_in=True, message='Login successful.')
        return jsonify(authentication_error=True, message='Wrong user ID or password.', logged_in=False)
    return jsonify(validation_error=True, errors=form.errors, logged_in=False)


@user_blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(logged_in=False, message='You have been logged out.')
