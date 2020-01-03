from flask import Blueprint, render_template, request, jsonify

from .models import Appointment


main_blueprint = Blueprint('main', __name__, url_prefix='/api')


@main_blueprint.route('/schedule-appointment', methods=['POST'])
def schedule_appointment():
    return jsonify(message='Appointment scheduled.')
