from flask import Blueprint, render_template, request

from app.user.forms import LoginForm


main_blueprint = Blueprint('main', __name__,)


@main_blueprint.route('/')
def home():
    return render_template('main/home.html', user_form=LoginForm())
