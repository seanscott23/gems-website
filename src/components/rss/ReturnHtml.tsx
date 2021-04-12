import React, { useEffect } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import AudioModalRipper from "../modal/AudioModalRipper";

interface Clip {
  title: string;
  enclosure: {
    url: string;
  };
}

const ReturnHTML = () => {
  const { rssFeedUrl, success } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalState] = React.useState(false);
  const [activeClip, setActiveClip] = React.useState<Clip | null>(null);

  const handleClose = () => {
    setModalState(!isModalOpen);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const audioClipsTooLong = () => {
    const audioItems: Array<object> = [];
    const allItems = rssFeedUrl.items;
    allItems.map(async (currentItem: any) => {
      if (parseInt(currentItem.itunes.duration) > 600) {
        audioItems.push(currentItem);
      }
    });
    return audioItems;
  };
  const items = audioClipsTooLong();
  let codeBlock: any[] = [];
  codeBlock = items.map((clip: any, i: number) => {
    return (
      <ListGroup.Item as="li">
        <Card>
          <Card.Body>
            <Card.Title>{clip.title}</Card.Title>
            {/* <Card.Text>{clip.contentSnippet}</Card.Text> */}

            <Button
              onClick={() => {
                setActiveClip(clip);
                setModalState(!isModalOpen);
              }}
            >
              Trim Audio
            </Button>
            {/* For the ripper, need to pass in the props its missing */}
            {!activeClip ? null : (
              <AudioModalRipper
                isOpen={isModalOpen}
                handleClose={handleClose}
                clip={activeClip}
                id={i}
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

export default ReturnHTML;
