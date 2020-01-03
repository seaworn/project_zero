import datetime as dt

from . import db
from .user.models import User, AnonymousUser
from .utils import ModelMixin


class Appointment(db.Model, ModelMixin):

    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship(User, backref=db.backref('appointments', cascade='all, delete-orphan'))
    full_name = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    treatment_history = db.Column(db.Boolean, default=False)
    history_details = db.Column(db.Text)
    schedule_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=dt.datetime.now)

    def __str__():
        return '<Appointment: {0}, {1}'.format(self.full_name, self.schedule_date)

