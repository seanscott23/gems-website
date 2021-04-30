import "../../styles/AudioModalRipper.css";
import React, { FC, useState } from "react";
import { Button, Form, Media, Modal, Spinner } from "react-bootstrap";
import "../../styles/Modal.css";
import { AudioPlayer } from "./AudioPlayer";
import {
  setLoading,
  submitNewClip,
  submitNewFile,
} from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

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
//u can leave the notes. they're helfpul.hha all good
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
    e.preventDefault();
    // debugger;
    if (end - begin <= 10) {
      if (clip.title != "") {
        setLoading(true);
        setTimeError(false);
        await dispatch(submitNewClip(clip.enclosure.url, begin, end));
      } else {
        setLoading(true);
        setTimeError(false);
        await dispatch(submitNewFile(clip.enclosure.url, begin, end));
      }
      setLoading(false);
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
            Audio length must be below 10 minutes.
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
