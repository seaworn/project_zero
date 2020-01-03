import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  
  return (
    <Container fluid className="py-5 bg-light">
      <Row className="py-4">
        <Col lg={6} md={6} id="aboutUs" className="mb-4 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4">About Us</h6>
          <p className="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt.</p>
        </Col>
        <Col lg={2} md={2} id="contactUs" className="mb-4 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4">Quick Links</h6>
          <ul className="list-unstyled mb-0">
            <li className="mb-2"><Link to="/login" className="text-muted">Login</Link></li>
            <li className="mb-2"><Link to="/signup" className="text-muted">Signup</Link></li>
            <li className="mb-2"><Link to="/products" className="text-muted">Our Products</Link></li>
            <li className="mb-2"><Link to="/faq" className="text-muted">FAQ</Link></li>
          </ul>
        </Col>
        <Col lg={2} md={2} className="mb-4 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4">Contact Us</h6>
          <ul className="list-unstyled mb-0">
            <li className="mb-2">Address</li>
            <li className="mb-2">Phone</li>
            <li className="mb-2">Email</li>
          </ul>
        </Col>
        <Col lg={2} md={2} className="mb-4 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4">Follow Us</h6>
          <ul className="list-unstyled mb-0">
            <li className="list-item">
              <a href="https://twitter.com" target="_blank" title="twitter"><span className="fa fa-twitter"></span>&nbsp;Twitter</a>
            </li>
            <li className="list-item">
              <a href="https://facebook.com" target="_blank" title="facebook"><span className="fa fa-facebook"></span>&nbsp;Facebook</a>
            </li>
            <li className="list-item">
              <a href="https://instagram.com" target="_blank" title="instagram"><span className="fa fa-instagram"></span>&nbsp;Instagram</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <p className="font-weight-bold">&copy; 2019 - {window.appName} | All rights reserved.</p>
      </Row>
    </Container>
  );
}