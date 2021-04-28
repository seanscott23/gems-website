import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/GemCard.css";

export const GemCard: React.FC<{
  gemID: string;
  gemInfo: any;
}> = ({ gemID, gemInfo }) => {

  const updateGem = () => {

  };
  const deleteGem = () => {
    
  };

  return (
    <div>
      <ListGroup.Item as="li">
        <Card>
          <Card.Body>
            <Card.Title>
              {gemInfo.title}
              <Card.Subtitle className="mb-2 text-muted explicitCard">
                {gemInfo.explicit ? "E" : null}
              </Card.Subtitle>
            </Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              {gemInfo.categories}
            </Card.Subtitle>
            <Card.Text>{gemInfo.description}</Card.Text>

            <audio
              src={gemInfo.audioURL}
              controls
              preload="metadata"
              className="cardAudio"
            >
              Your browser does not support the audio element.
            </audio>
          </Card.Body>
          <Card.Footer>
            <Button onClick={deleteGem}>Delete</Button>
            <Button onClick={updateGem}>Edit</Button>
          </Card.Footer>
        </Card>
      </ListGroup.Item>
    </div>
  );
};

export default GemCard;
