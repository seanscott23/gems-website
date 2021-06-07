import React, { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../../styles/UpdateModal.css";
import {
  updateGemAction,
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
    categories: Array<string>;
    explicit: boolean;
    ownerId: string;
    duration: string;
  };
}
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  gem: Gem;
}

const UpdateGemModal: FC<ModalProps> = ({ isOpen, handleClose, gem }) => {
  // const { userGems } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [explicit, setExplicit] = useState(false);
  const dispatch = useDispatch();

  // const updateUserGem = (id: string) => {
  //   let index;
  //   userGems.forEach((gem, i) => {
  //     if (gem.gemID === id) {
  //       index = i;
  //     }
  //   });
  //   let audioURL = gem.gemInfo.audioURL;
  //   if (index !== undefined) {
  //     userGems[index] = {
  //       gemID: id,
  //       gemInfo: {
  //         audioURL,
  //         title,
  //         description,
  //         categories,
  //         explicit,
  //       },
  //     };
  //   }
  // };

  const updateHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    await dispatch(
      updateGemAction(
        gem.gemInfo.duration,
        gem.gemInfo.audioURL,
        title,
        description,
        categories,
        explicit,
        gem.gemID
      )
    );
    dispatch(getUserGems());

    handleClose();
  };

  const changeTitle = (e: React.ChangeEvent) => {
    let cTarget: any = e.currentTarget;
    setTitle(cTarget.value);
  };
  useEffect(() => {
    setTitle(gem.gemInfo.title);
    setDescription(gem.gemInfo.description);
    setCategories(gem.gemInfo.categories);
    setExplicit(gem.gemInfo.explicit);
  }, [gem]);

  const getCategories = (e: React.ChangeEvent<HTMLElement>) => {
    let target: any = e.currentTarget;
    let array = target.selectedOptions;
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i].value);
    }
    setCategories(newArray);
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
      id="update-modal"
      // size="lg"
    >
      <Modal.Body className="update-modal">
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => changeTitle(e)}
            />
            <br />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              className="gem-description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />

            <Form.Label>
              Select Categories (commmand + click to select multiple)
            </Form.Label>
            <Form.Control
              as="select"
              multiple
              id="gem-categories"
              // value={categories}
              onChange={(e) => getCategories(e)}
            >
              <option>Comedy</option>
              <option>News</option>
              <option>History</option>
              <option>Science</option>
              <option>Music</option>
            </Form.Control>
            <br />
            <Form.Check
              type="checkbox"
              label="Check box if explicit"
              id={`disabled-default-checkbox`}
              checked={explicit}
              onChange={(e) => setExplicit(e.currentTarget.checked)}
            />
          </Form.Group>
        </Form>
        <div className="Update-buttons">
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={(e) => updateHandler(e)}>Update</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateGemModal;
