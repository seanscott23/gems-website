import React, { FC } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Library: FC = () => {
  const { userGems, user } = useSelector((state: RootState) => state.auth);
  debugger;

  return (
    <section className="section">
      <h1>Library Page!</h1>
      <Container className="library-container">
        <Row>
          <Col>
            {/* <Card>
              <Card.Body>
                <Card.Title>{FinalGem.title}</Card.Title>
                <Card.Text>{FinalGem.description}</Card.Text>
                <audio src={FinalGem.audioURL}></audio>
                <Card.Subtitle className="mb-2 text-muted">
                  {FinalGem.explicit ? "E" : null}
                </Card.Subtitle>
              </Card.Body>
              <Card.Footer className="text-muted">
                {FinalGem.categories.forEach((category: string) => {
                  return category;
                })}
              </Card.Footer>
            </Card> */}
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
