import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const GemForm = () => {
  const { gemURL } = useSelector((state: RootState) => state.auth);
  return (
    <div className="gem-container">
      <h1>Upload Gem Form</h1>
      <audio src={gemURL} controls preload="metadata"></audio>
      <br />
      <Form.Group>
        <Form.Control type="text" placeholder="Title" />
        <br />

        <Form.Control as="textarea" rows={3} placeholder="Description" />
        <br />
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Select Categories</Form.Label>
          <Form.Control as="select" multiple>
            <option>Comedy</option>
            <option>News</option>
            <option>History</option>
            <option>Science</option>
            <option>Music</option>
          </Form.Control>
        </Form.Group>
        <br />
        <Form.Check
          type="checkbox"
          label="Check box if explicit"
          id={`disabled-default-checkbox`}
        />
      </Form.Group>
    </div>
  );
};

export default GemForm;
