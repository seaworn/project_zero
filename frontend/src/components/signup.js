import React, { useState, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import Home from './home';
import { StoreContext } from '../store';

export default function Signup() {

  const {setLoggedUser} = useContext(StoreContext)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [validated, setValidated] = useState(false);

  function doSignup(e) {

    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) return;
    axios
      .post(`/api/register`, {username, email, password_one: passwordOne, password_two: passwordTwo})
      .then(result => {
        if (result.data.logged_in) {
          setLoggedUser(result.data.username);
          NotificationManager.success(result.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Home>
      <Col md={4} className="jumbotron">
        <h1>Signup</h1>
        <hr className="my-2" />
        <Form noValidate validated={validated} onSubmit={doSignup}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Username must be atleast 3 characters.
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="username@example.com" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
          </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password_one" value={passwordOne} onChange={e => setPasswordOne(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password_two" value={passwordTwo} onChange={e => setPasswordTwo(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please confirm your password.
          </Form.Control.Feedback>
          </Form.Group>
          <Button variant="success" type="submit">Submit</Button>
        </Form>
        <p className="mt-4">Already have an account?&nbsp;<Link to="/login">Login</Link></p>
      </Col>
    </Home>
  );
}