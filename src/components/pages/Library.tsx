import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Library: FC = () => {
  const { gemURL } = useSelector((state: RootState) => state.auth);
  return (
    <section className="section">
      <h1>Library Page!</h1>
      <Container className="library-container">
        <Row>
          <Col>
            <audio src={gemURL}></audio>
          </Col>
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
