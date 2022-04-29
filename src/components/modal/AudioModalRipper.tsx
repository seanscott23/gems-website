import React, { FC, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "../../styles/Modal.css";
import { AudioPlayer } from "./AudioPlayer";
import { submitNewClip, submitNewFile } from "../../store/actions/authActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

interface Clip {
  title: string;
  enclosure: {
    url: string;
  };
}

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  clip: Clip;
  id: number;
  begin: number;
  end: number;
  handleTimeUpdate: (arg1: number, arg2: number) => void;
}

const AudioModalRipper: FC<ModalProps> = ({
  isOpen,
  handleClose,
  clip,
  id,
  begin,
  end,
  handleTimeUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const submitHandler = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (end - begin <= 10) {
      e.preventDefault();
      setLoading(true);
      setTimeError(false);
      if (clip.title !== "") {
        await dispatch(submitNewClip(clip.enclosure.url, begin, end));
      } else {
        await dispatch(submitNewFile(clip.enclosure.url, begin, end));
        setLoading(false);
      }
      history.push("/gem-form");
    } else {
      setTimeError(true);
    }
  };

  if (!clip) return null;

  return (
    <Modal
      show={isOpen}
      clip={clip}
      onHide={handleClose}
      keyboard={false}
      backdrop="static"
      className="modalBack"
      id={id}
      begin={begin}
      end={end}
      // size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>{clip.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">
        <div className="audioPlayer">
          <AudioPlayer
            url={clip.enclosure.url}
            isOpen={isOpen}
            begin={begin}
            end={end}
            handleTimeUpdate={handleTimeUpdate}
          />
        </div>
      </Modal.Body>
      <Modal.Footer id="modal-footer">
        {timeError ? (
          <span className="audioError">
            Audio clip length must be below 10 minutes.
          </span>
        ) : null}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => submitHandler(e)}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Crop Audio"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AudioModalRipper;
