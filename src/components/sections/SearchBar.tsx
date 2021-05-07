import React from "react";
import { InputGroup } from "react-bootstrap";
import Input from "../UI/Input";
import Button from "../UI/Button";
import "../../styles/Search.css";

export interface SearchBarProps {
  input: string;
  setInput: (input: string) => void;
  // handleChange: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  input,
  setInput,
  // handleChange,
}) => {
  return (
    <InputGroup className="search-input">
      <Input
        type="text"
        label=""
        name="search"
        placeholder="Search by title"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      {/* <div>
        <Button text="Search" onClick={handleChange}></Button>
      </div> */}
    </InputGroup>
  );
};

export default SearchBar;
