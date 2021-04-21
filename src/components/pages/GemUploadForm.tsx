import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Modal: React.FC<{
  item: {
    name: string;
  } | null;
}> = ({ item }) => {
  if (!item) return null;
  return (
    <div>
      <h1>Modal</h1>
      <div>{item.name}</div>
    </div>
  );
};

interface Item {
  name: string;
}

const GemForm = () => {
  const { gemURL } = useSelector((state: RootState) => state.auth);
  const items = [{ name: "hello" }, { name: "goodbye" }];
  return (
    <div>
      <h1>Upload Gem Form</h1>
      <Form.Group>
        <audio src={gemURL}></audio>
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
