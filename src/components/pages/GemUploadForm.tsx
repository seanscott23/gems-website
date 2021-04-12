import React from "react";
import { Form } from "react-bootstrap";

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

const ItemsIndex = () => {
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const items = [{ name: "hello" }, { name: "goodbye" }];
  return (
    <div>
      <h1>Upload Gem Form</h1>
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
    </div>
  );
};
// Your modal is ALWAYS on the page
// You put items INTO the modal on click rather than making new JSX
// The JSX that you need should already exist on the page and only show when the item has something in it
// This is a simple example that makes the page concise, but also reduces functions rendering more JSX that renders functions, etc
// It's a bad loop to get into
