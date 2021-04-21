import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Library: FC = () => {
  return (
    <section className="section">
      <h1>Library Page!</h1>
      <Container className="library-container">
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </section>
  );
};

export default Library;
