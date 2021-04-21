import "../../styles/AudioModalRipper.css";
import React, { FC, useState } from "react";
import { Button, Form, Media, Modal } from "react-bootstrap";
import "../../styles/Modal.css";
import { AudioPlayer } from "./AudioPlayer";
import { setLoading, submitNewClip } from "../../store/actions/authActions";
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
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(submitNewClip(clip.enclosure.url, begin, end));
    setLoading(false);
    history.push("/library");
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => submitHandler(e)}>
          {loading ? "Loading..." : "Crop Audio"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AudioModalRipper;
