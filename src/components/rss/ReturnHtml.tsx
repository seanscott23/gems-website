import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import AudioModalRipper from "../modal/AudioModalRipper";

export const returnHTML = () => {
  const [isModalOpen, setModalState] = React.useState(false);
  const [activeClip, setActiveClip] = React.useState(null);
  const items = audioClipsTooLong();
  let codeBlock: any[] = [];
  codeBlock = items.map((clip: any, i: number) => {
    return (
      <ListGroup.Item as="li">
        <Card>
          <Card.Body>
            <Card.Title>{clip.title}</Card.Title>
            {/* <Card.Text>{clip.contentSnippet}</Card.Text> */}
            {/* <Button onClick={() => toggleModal(i)}>View audio</Button> */}
            <Button
              onClick={() => {
                // Function that makes item active
                setActiveClip(clip);
              }}
            >
              View audio
            </Button>
            {/* For the ripper, need to pass in the props its missing */}
            {!activeClip ? null : (
              <AudioModalRipper
                isOpen={isModalOpen}
                clip={activeClip}
                // title={clip.title}
                // url={clip.enclosure.url}
              />
            )}
            {/* Also, i suggest you pass in the clip entirely rather than bits of it . how?*/}
          </Card.Body>
        </Card>
      </ListGroup.Item>
    );
  });

  let finalBlock;
  if (codeBlock.length > 0) {
    finalBlock = (
      <div>
        <h3 style={{ textAlign: "center" }}>These clips need to be trimmed</h3>
        {codeBlock}
      </div>
    );
  }
  return finalBlock;
};

// Does that makes sense so far?
// Now in the ripper, manage the clip's data
 