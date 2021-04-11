// We're going to create a few simple components in here
import React from "react";

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
const items = [
  {    name: 'hello'}, {name: 'goodbye'}
]
  return (
    <div>
      <h1>Items!!</h1>
      <Modal item={selectedItem} />
      {items.map((item, i) => {
        return (
          <div key={i}>
            <button onClick={() => setSelectedItem(item)}>{item}</button>
          </div>
        );
      })}
    </div>
  );
};

// Great. So what's going on here
// Your modal is ALWAYS on the page
// You put items INTO the modal on click rather than making new JSX
  // The JSX that you need should already exist on the page and only show when the item has something in it
  // This is a simple example that makes the page concise, but also reduces functions rendering more JSX that renders functions, etc
  // It's a bad loop to get into

  // Great. Let's look at the modal now
  
