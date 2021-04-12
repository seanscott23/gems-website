import "../../styles/AudioModalRipper.css";
import React, { FC, useState } from "react";
import { Button, Form, Media, Modal } from "react-bootstrap";
import "../../styles/Modal.css";
import { AudioPlayer } from "./AudioPlayer";

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
}
//u can leave the notes. they're helfpul.hha all good
const AudioModalRipper: FC<ModalProps> = ({
  isOpen,
  handleClose,
  clip,
  id,
}) => {
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
    >
      <Modal.Header closeButton>
        <Modal.Title>{clip.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">
        <div className="audioPlayer">
          <AudioPlayer url={clip.enclosure.url} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Upload Gem</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AudioModalRipper;
