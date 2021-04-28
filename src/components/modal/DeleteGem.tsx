import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteGemModal: FC = () => {
  return (
    <Modal>
      <Modal.Header>Are you sure you want to delete this gem?</Modal.Header>
      <Modal.Body>Once you delete this gem, it cannot be undone.</Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
        <Button>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteGemModal;
