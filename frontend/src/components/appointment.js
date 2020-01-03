import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { NotificationManager } from "react-notifications";

import Main from "./main";

export default function Appointment() {

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [treatmentHistory, setTreatmentHistory] = useState('');
  const [historyDetails, setHistoryDetails] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [validated, setValidated] = useState(false);

  function doScheduleAppointment(e) {

    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) return;
    axios
      .post('/api/schedule-appointment', {
        full_name: `${firstName} ${middleName} ${lastName}`,
        phone_no: phoneNo,
        age,
        gender,
        treatment_history: treatmentHistory,
        history_details: historyDetails,
        schedule_date: scheduleDate
      })
      .then(result => {
        NotificationManager.success(result.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} className="jumbotron">
            <h1>Patient Details</h1>
            <p>Please fill the form below indicaticating the appoitment type you need. We will get back to you soon.</p>
            <hr className="my-2" />
            <Form noValidate validated={validated} onSubmit={doScheduleAppointment}>
              <Form.Group controlId="fullName">
                <Form.Label>Your full name</Form.Label>
                <InputGroup>
                  <Form.Control type="text" placeholder="Fisrt" name="first_name" value={firstName} onChange={e => setFirstName(e.target.value.trim())} required />
                  <Form.Control type="text" placeholder="Middle" name="middle_name" value={middleName} onChange={e => setMiddleName(e.target.value.trim())} />
                  <Form.Control type="text" placeholder="Last" name="last_name" value={lastName} onChange={e => setLastName(e.target.value.trim())} />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Please tell us your full name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phoneNo">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup>
                  <Form.Control as="select">
                    <option>+254</option>
                  </Form.Control>
                  <Form.Control type="telephone" maxLength="9" placeholder="7********" name="phone_no" value={phoneNo} onChange={e => setPhoneNo(e.target.value)} required />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Please give us your phone number so we can contact you.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="genderSelector">
                <Form.Label>Choose your gender</Form.Label>
                <Form.Check label="Male" type="radio" name="gender" value="M" id="gendeMale" required />
                <Form.Check label="Female" type="radio" name="gender" value="F" id="genderFemale" />
                <Form.Check label="Other" type="radio" name="gender" value="X" id="genderOther" />
              </Form.Group>
              <Form.Group controlId="phoneNo">
                <Form.Label>How old are you?</Form.Label>
                <Form.Control type="number" min="0" placeholder="Your age" name="age" value={age} onChange={e => setAge(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                  Please tell us how old you are.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="treatmentHistory">
                <Form.Label>Have you previously attended our facility?</Form.Label>
                <Form.Check type="radio" label="Yes" name="treatment_history" value="Y" id="treatmentHistoryYes" required />
                <Form.Check type="radio" label="No" name="treatment_history" value="N" id="treatmentHistoryNo" />
              </Form.Group>
              <Form.Group controlId="historyDetails">
                <Form.Label>If Yes, state on which condition and when?</Form.Label>
                <Form.Control as="textarea" rows="3" name="history_details" value={historyDetails} onChange={e => setHistoryDetails(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="appointmentType">
                <Form.Label>What kind of appointment do you need?</Form.Label>
                <Form.Check type="radio" label="One kind" name="appointment_type" value="t1" id="appointment1" required />
                <Form.Check type="radio" label="Another kind" name="appointment_type" value="t2" id="appointment2" />
                <Form.Check type="radio" label="The other kind" name="appointment_type" value="t3" id="appointment3" />
                <Form.Check type="radio" label="General" name="appointment_type" value="t4" id="generalAppointment" />
              </Form.Group>
              <Form.Group controlId="scheduleDate">
                <Form.Label>When would you like to come in?</Form.Label>
                <Form.Control type="date" name="schedule_date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} required />
              </Form.Group>
              <Button variant="success" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
