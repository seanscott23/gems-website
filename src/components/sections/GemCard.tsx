import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

export const GemCard: React.FC<{
  gemID: string;
  gemInfo: any;
}> = ({ gemID, gemInfo }) => {
  return (
    <div>
      <ListGroup.Item as="li">
        <Card>
          <Card.Body>
            <Card.Title>{gemInfo.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {gemInfo.explicit ? "E" : null}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {gemInfo.categories}
            </Card.Subtitle>
            <Card.Text>{gemInfo.description}</Card.Text>
            <audio src={gemInfo.audioURL}></audio>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    </div>
  );
};

export default GemCard;
