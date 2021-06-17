import React, { FC, useEffect, useRef } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import "../../styles/GemForm.css";
import { submitFinalGem } from "../../store/actions/gemSubmitAction";
import Button from "../UI/Button";
import { useHistory } from "react-router-dom";

const GemForm: FC = () => {
  const { gemURL } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [gemID, setGemID] = useState("");
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  if (!localStorage.getItem("gemURL")) {
    window.localStorage.setItem("gemURL", JSON.stringify(gemURL));
  }
  let storedURL = "";
  if (gemURL === "" && window.localStorage.getItem("gemURL") !== null) {
    let newURL = window.localStorage.getItem("gemURL");
    storedURL = newURL ? JSON.parse(newURL) : "";
  }
  const getGemID = (gemURL: string) => {
    let splitURL = gemURL.split("token=");
    setGemID(splitURL[1]);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioMetaData, setAudioMetaData] =
    useState<HTMLAudioElement | undefined>();

  useEffect(() => {
    if (audioRef.current) {
      setAudioMetaData(audioRef.current);
    }
  }, [audioMetaData]);

  const submitHandler = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    localStorage.clear();
    getGemID(gemURL);
    if (gemURL === "" && audioMetaData) {
      dispatch(
        await submitFinalGem(
          storedURL,
          title,
          description,
          categories,
          isChecked,
          gemID,
          audioMetaData.duration
        )
      );
    } else if (gemURL !== "" && audioMetaData) {
      dispatch(
        await submitFinalGem(
          gemURL,
          title,
          description,
          categories,
          isChecked,
          gemID,
          audioMetaData.duration
        )
      );
    }

    setLoading(false);
    history.push("/library");
  };

  const getCategories = (e: React.ChangeEvent) => {
    let target: any = e.currentTarget;
    let array = target.selectedOptions;
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i].value);
    }
    setCategories(newArray);
  };

  return (
    <div className="gem-container">
      <h1>Upload Gem Form</h1>
      {gemURL !== "" ? (
        <audio src={gemURL} controls preload="metadata" ref={audioRef}></audio>
      ) : (
        <audio
          src={storedURL}
          controls
          preload="metadata"
          ref={audioRef}
        ></audio>
      )}

      <br />
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <br />
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Description"
          className="gem-description"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />

        <Form.Label>
          Select Categories (commmand + click to select multiple)
        </Form.Label>
        <Form.Control
          required
          // type={isInvalid}
          as="select"
          multiple
          id="gem-categories"
          onChange={(e: any) => getCategories(e)}
        >
          <option>Comedy</option>
          <option>Society & Culture</option>
          <option>Business</option>
          <option>Sports</option>
          <option>Health & Fitness</option>
          <option>Arts</option>
          <option>Fiction</option>
          <option>Philosophy</option>
          <option>Motivation</option>
          <option>True Crime</option>
          <option>News</option>
          <option>History</option>
          <option>Science</option>
          <option>Music</option>
        </Form.Control>
        {/* {isInvalid ? (
          <Form.Control.Feedback type="invalid">
            Please select at least one category.
          </Form.Control.Feedback>
        ) : null} */}
        <br />
        <Form.Check
          type="checkbox"
          label="Check box if explicit"
          id={`disabled-default-checkbox`}
          onChange={(e) => setChecked(e.currentTarget.checked)}
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
