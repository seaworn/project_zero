from flask import render_template, Blueprint, url_for, redirect, flash, request
from flask_login import login_user, logout_user, login_required

from app import db
from .models import User
from .forms import LoginForm, RegisterForm


user_blueprint = Blueprint('user', __name__,)


@user_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        flash('Welcome! Thank you for registering.', 'success')
        return redirect(url_for("main.home"))
    return render_template('main/home.html', user_form=form, user_is_new=True)


@user_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    if form.validate_on_submit():
        user = User.query.filter(
            db.or_(User.username == form.username.data, User.email == form.username.data)).first()
        if user is not None and user.check_password(form.password.data):
            login_user(user)
            flash('You are now logged in.', 'success')
            return redirect(url_for('main.home'))
        else:
            flash('Wrong username/email or password.', 'danger')
    return render_template('main/home.html', user_form=form)


@user_blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You were logged out. Bye!', 'info')
    return redirect(url_for('main.home'))
