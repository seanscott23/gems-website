import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import "../../styles/GemForm.css";
// import { submitFinalGem } from "../../store/actions/gemSubmitAction";
import Button from "../UI/Button";
import { useHistory } from "react-router-dom";
const GemForm = () => {
  const { gemURL } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    // await dispatch(submitFinalGem());
    setLoading(false);
    // history.push("/library");
  };

  return (
    <div className="gem-container">
      <h1>Upload Gem Form</h1>
      <audio src={gemURL} controls preload="metadata"></audio>
      <br />
      <Form.Group>
        <Form.Control type="text" placeholder="Title" />
        <br />
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Description"
          className="gem-description"
        />

        <Form.Label>
          Select Categories (commmand + click to select multiple)
        </Form.Label>
        <Form.Control as="select" multiple id="gem-categories">
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
        />
        <Button
          className="gem-form-button"
          onClick={(e) => submitHandler(e)}
          text="Submit Gem"
        />
      </Form.Group>
    </div>
  );
};

export default GemForm;
