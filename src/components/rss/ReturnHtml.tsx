import React, { FC, useEffect } from "react";
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

const ReturnHTML: FC<{
  posts: Array<any>;
  clips: Array<any>;
  setClips: (clips: any[]) => void;
  input: string;
}> = ({ posts, clips, setClips, input }) => {
  const { rssFeedUrl, success } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalState] = React.useState(false);
  const [activeClip, setActiveClip] = React.useState<Clip | null>(null);
  const [begin, setBegin] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const handleClose = () => {
    setModalState(!isModalOpen);
  };
  const handleTimeUpdate = (startPoint: number, endPoint: number) => {
    setBegin(startPoint);
    setEnd(endPoint);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return input === "" ? (
    <div>
      {posts.map((clip: any, i: number) => (
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
                Crop audio
              </Button>

              {!activeClip ? null : (
                <AudioModalRipper
                  isOpen={isModalOpen}
                  handleClose={handleClose}
                  clip={activeClip}
                  id={i}
                  begin={begin}
                  end={end}
                  handleTimeUpdate={handleTimeUpdate}
                />
              )}
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </div>
  ) : (
    <div>
      {clips.map((clip: any, i: number) => (
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
                Crop audio
              </Button>

              {!activeClip ? null : (
                <AudioModalRipper
                  isOpen={isModalOpen}
                  handleClose={handleClose}
                  clip={activeClip}
                  id={i}
                  begin={begin}
                  end={end}
                  handleTimeUpdate={handleTimeUpdate}
                />
              )}
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </div>
  );
};

export default ReturnHTML;
