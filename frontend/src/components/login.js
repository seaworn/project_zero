import React, { useState, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Formik } from "formik";

import Home from './home';
import { StoreContext } from '../store';
import { validityProps } from './signup';

export default function Login() {

  const { dispatchUserAction } = useContext(StoreContext);

  function validate(values) {
    const errors = {};
    if (!values.userId) errors.userId = 'Please enter your user ID.';
    if (!values.password) errors.password = 'Please enter your user password.';
    return errors;
  }

  function doLogin(values) {

    axios
      .post(`/api/login`, values)
      .then(response => {
        if (response.data.logged_in) {
          dispatchUserAction({
            type: 'login',
            payload: {
              username: response.data.username,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token
            }
          }
        );
        NotificationManager.success(response.data.message);
        } else {
          if ('authentication_error' in response.data) {
            NotificationManager.error(response.data.message);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Home>
      <Col md={4} className="jumbotron">
        <h1>Login</h1>
        <hr className="my-2" />
        <Formik
          initialValues={{
            userId: '',
            password: ''
          }}
          validate={validate}
          onSubmit={doLogin} >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="userId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  placeholder="Username or Email"
                  required
                  value={values.userId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  {...validityProps(errors.userId, touched.userId)} />
                <Form.Control.Feedback type="invalid">{errors.userId}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  {...validityProps(errors.password, touched.password)} />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
        <p className="mt-4">Don't have an account?&nbsp;<Link to="/signup">Signup</Link></p>
      </Col>
    </Home>
  );
}
