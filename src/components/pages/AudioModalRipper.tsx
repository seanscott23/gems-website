import "../../styles/AudioModalRipper.css";
import React, { FC, useState } from "react";
import { Button, Media, Modal } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  url: string;
  id: number;
}

export const AudioModalRipper: FC<ModalProps> = ({
  show,
  handleClose,
  title,
  url,
  id,
}) => {
  return show ? (
    <Modal
      show={show}
      id={id}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <audio controls>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Upload Gem</Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};
