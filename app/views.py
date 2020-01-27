from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from .models import Appointment


main_blueprint = Blueprint('main', __name__, url_prefix='/api')


@main_blueprint.route('/schedule-appointment', methods=['POST'])
@jwt_required
def schedule_appointment():
    return jsonify(message='Appointment scheduled.')
