import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/GemCard.css";
import DeleteGemModal from "../modal/DeleteGem";
import UpdateGemModal from "../modal/UpdateGem";

interface Gem {
  gemID: string;
  gemInfo: {
    audioURL: string;
    title: string;
    description: string;
    categories: Array<any>;
    explicit: boolean;
    ownerId: string;
    duration: number;
  };
}

export const GemCard: React.FC<{
  gemID: string;
  gemInfo: any;
}> = ({ gemID, gemInfo }) => {
  const [isDeleteModalOpen, setDeleteModalState] = React.useState(false);
  const [isUpdateModalOpen, setUpdateModalState] = React.useState(false);
  const [audioShow, setAudioShow] = React.useState(false);
  const [hideButton, setHideButton] = React.useState(true);
  const [activeClip, setActiveClip] = React.useState<Gem | null>(null);
  const handleDeleteClose = () => {
    setDeleteModalState(!isDeleteModalOpen);
  };

  const handleUpdateClose = () => {
    setUpdateModalState(!isUpdateModalOpen);
  };

  const categories = gemInfo.categories;

  const getCategories =
    categories !== undefined
      ? categories.map((category: string) => (
          <div className="gemCategory">{category}</div>
        ))
      : [];

  let gem = { gemID, gemInfo } as Gem;
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
              {getCategories}
            </Card.Subtitle>
            <Card.Text>{gemInfo.description}</Card.Text>
            {hideButton ? (
              <Button
                onClick={() => {
                  setAudioShow(!audioShow);
                  setHideButton(!hideButton);
                }}
              >
                Show audio
              </Button>
            ) : null}
            {audioShow ? (
              <audio
                src={gemInfo.audioURL}
                controls
                preload="metadata"
                className="cardAudio"
              >
                Your browser does not support the audio element.
              </audio>
            ) : null}
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() => {
                setActiveClip(gem);
                setDeleteModalState(!isDeleteModalOpen);
              }}
              data-target={gem.gemID}
            >
              Delete
            </Button>
            {!activeClip ? null : (
              <DeleteGemModal
                isOpen={isDeleteModalOpen}
                handleClose={handleDeleteClose}
                gem={activeClip}
                data-target={gem.gemID}
              />
            )}
            <Button
              onClick={() => {
                setActiveClip(gem);
                setUpdateModalState(!isUpdateModalOpen);
              }}
              data-target={gem.gemID}
            >
              Edit
            </Button>
            {!activeClip ? null : (
              <UpdateGemModal
                isOpen={isUpdateModalOpen}
                handleClose={handleUpdateClose}
                gem={activeClip}
                data-target={gem.gemID}
              />
            )}
          </Card.Footer>
        </Card>
      </ListGroup.Item>
    </div>
  );
};

export default GemCard;
