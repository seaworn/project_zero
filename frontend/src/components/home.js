import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

import Main from './main';

export default function Home({children}) {
  return (
    <Main>
      <Container>
        <Row>
          <Col md={8}>
            <div>
              <figure className="figure">
                <img src="" className="figure-img img-fluid rounded" alt="..." />
                <figcaption className="figure-caption">Image caption.</figcaption>
              </figure>
            </div>
            <div>
              <figure className="figure">
                <img src="" className="figure-img img-fluid rounded" alt="..." />
                <figcaption className="figure-caption">Image caption.</figcaption>
              </figure>
            </div>
          </Col>
          {children}
        </Row>
      </Container>
    </Main>
  );
}
