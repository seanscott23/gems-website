import React, { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../styles/DeleteModal.css";

interface Gem {
  gemID: string;
  gemInfo: {
    audioURL: string;
    title: string;
    description: string;
    categories: Array<any>;
    explicit: boolean;
    ownerId: string;
  };
}
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  gem: Gem;
}

const DeleteGemModal: FC<ModalProps> = ({ isOpen, handleClose, gem }) => {
  const [loading, setLoading] = useState(false);
  const deleteHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    // dispatch(deleteGemAction())
    setLoading(false);
  };

  if (!gem) return null;
  return (
    <Modal
      show={isOpen}
      gem={gem}
      onHide={handleClose}
      keyboard={false}
      backdrop="static"
      className="modalBack"
      // size="lg"
    >
      <Modal.Header className="deleteModal-warning">
        Are you sure you want to delete this gem?
      </Modal.Header>
      <Modal.Body>Once you delete this gem, it cannot be undone.</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={(e) => deleteHandler(e)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteGemModal;