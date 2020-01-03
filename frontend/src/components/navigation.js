import React, {useContext} from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

import {AppContext} from '../store';

export default function Navigation() {

  const {loggedUser, setLoggedUser} = useContext(AppContext);
  
  function logout(...args) {

    const [/*eventKey*/, e] = args;
    e.preventDefault();
    axios
      .get(`/api/logout`)
      .then(res => {
        if(res.data.logged_out) {
          NotificationManager.success(res.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
    setLoggedUser(null);
  }

  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>ProjectZero</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Home" id="basic-nav-dropdown">
            <LinkContainer to="/schedule-appointment">
              <NavDropdown.Item>Schedule Appointment</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item href="/action">Action</NavDropdown.Item>
            <NavDropdown.Item href="/action">Another action</NavDropdown.Item>
            <NavDropdown.Item href="/action">Something</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/action">Something Else</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Causes" id="basic-nav-dropdown">
            <NavDropdown.Item href="/action">Action</NavDropdown.Item>
            <NavDropdown.Item href="/action">Another action</NavDropdown.Item>
            <NavDropdown.Item href="/action">Something</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/action">Separated link</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Preventive Measures" id="basic-nav-dropdown">
            <NavDropdown.Item href="/action">Action</NavDropdown.Item>
            <NavDropdown.Item href="/action">Another action</NavDropdown.Item>
            <NavDropdown.Item href="/action">Something</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/action">Separated link</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#aboutUs">About Us</Nav.Link>
          <Nav.Link href="#contactUs">Contact Us</Nav.Link>
        </Nav>
        <Form inline>
          <InputGroup>
            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="success">Search</Button>
          </InputGroup>
        </Form>&nbsp;
        {
          (function () {
            if (loggedUser !== null) {
              return (
                <NavDropdown title={loggedUser || ''} id="basic-nav-dropdown">
                  <LinkContainer to="/logout">
                    <NavDropdown.Item onSelect={logout}>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              );
            } else {
              return (
                <ButtonGroup>
                  <LinkContainer to="/login">
                    <Button>Login</Button>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Button>Signup</Button>
                  </LinkContainer>
                </ButtonGroup>
              );
            }
          })()
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
