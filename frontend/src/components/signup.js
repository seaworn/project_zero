import React, { useState, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Formik } from "formik";

import Home from './home';
import { StoreContext } from '../store';

export function validityProps(error, touched) {
  return {isValid: !error && touched, isInvalid: error && touched};
}

export default function Signup() {
  
  const { setLoggedUser } = useContext(StoreContext)

  function validate(values) {
    const errors = {}
    Object.keys(values).map(key => {
      if (!values[key]) errors[key] = 'Required';
    });
    if (!errors.username && values.username.length < 3) {
      errors.username = 'Too short. Must be atleast 3 characters'
    }
    if (!errors.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Enter a valid email.';
    }
    if (!errors.password && values.password.length < 6) {
      errors.password = 'Too short. Must be atleast 6 characters'
    }
    if (!errors.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password do not match.'
    }
    return errors;
  }


  function doSignup(values) {

    axios
      .post(`/api/register`, values)
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
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validate={validate}
          onSubmit={doSignup} >
          {(formik) => (
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="username"
                  required 
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...validityProps(formik.errors.username, formik.touched.username)} />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="username@example.com"
                  required 
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...validityProps(formik.errors.email, formik.touched.email)} />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  required 
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...validityProps(formik.errors.password, formik.touched.password)} />
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Password"
                  required 
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...validityProps(formik.errors.confirmPassword, formik.touched.confirmPassword)} />
                  <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
        <p className="mt-4">Already have an account?&nbsp;<Link to="/login">Login</Link></p>
      </Col>
    </Home>
  );
}