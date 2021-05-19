import React, { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../styles/DeleteModal.css";
import {
  deleteGemAction,
  getUserGems,
} from "../../store/actions/gemSubmitAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

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
  const { userGems } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const removeFromArray = (id: string) => {
    userGems.filter((value) => value === id);
    return userGems;
  };

  const deleteHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    await dispatch(deleteGemAction(gem.gemID));

    handleClose();
    // await dispatch(removeFromArray(gem.gemID));

    // await dispatch(getUserGems());
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
      id="delete-modal"
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
