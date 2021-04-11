import "../../styles/AudioModalRipper.css";
import React, { FC, useState } from "react";
import { Button, Media, Modal } from "react-bootstrap";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  clip: {
    title?: string;
    url?: string;
  };
  // Make an interface for the clip and use it instead of object^cool
  id: number;
}
//u can leave the notes. they're helfpul.hha all good
const AudioModalRipper: FC<ModalProps> = ({ isOpen, handleClose, clip }) => {
  return (
    <Modal
      show={isOpen}
      clip={clip}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{clip.title}</Modal.Title>
      </Modal.Header>
      <audio controls>
        <source src={clip.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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
