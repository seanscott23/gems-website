import "../../styles/AudioModalRipper.css";
import React, { FC, useState } from "react";
import { Button, Form, Media, Modal } from "react-bootstrap";
import "../../styles/Modal.css";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  clip: {
    title?: string;
    enclosure?: {
      url?: string;
    };
  };
  id: number;
}
//u can leave the notes. they're helfpul.hha all good
const AudioModalRipper: FC<ModalProps> = ({
  isOpen,
  handleClose,
  clip,
  id,
}) => {
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
      <audio controls>
        <source src={clip.enclosure?.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Form.Group>
        <Form.Control type="text" placeholder="Title" />
        <br />
        <Form.Control as="textarea" rows={3} placeholder="Description" />
        <br />
        <Form.Check
          type="checkbox"
          label="Check box if explicit"
          id={`disabled-default-checkbox`}
        />
      </Form.Group>
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
