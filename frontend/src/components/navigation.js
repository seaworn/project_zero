import React, {useContext} from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

import {StoreContext} from '../store';

export default function Navigation() {

  const {currentUser, dispatchUserAction} = useContext(StoreContext);
  
  function logout(evenyKey, event) {

    event.preventDefault();
    axios
      .get(`/api/logout`, {headers: {'Authorization': `Bearer ${currentUser.accessToken}`}})
      .then(function (response) {
        if(response.data.logged_in === false) {
          dispatchUserAction({type: 'logout'});
          NotificationManager.success(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
            if (currentUser.loggedIn === true) {
              return (
                <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
                  <NavDropdown.Item onSelect={logout}>Logout</NavDropdown.Item>
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
