import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "../../styles/GemForm.css";
import Button from "../UI/Button";
const GemForm = () => {
  const { gemURL } = useSelector((state: RootState) => state.auth);

  const submitFinalGem = () => {};

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
          onClick={submitFinalGem}
          text="Submit Gem"
        />
      </Form.Group>
    </div>
  );
};

export default GemForm;
