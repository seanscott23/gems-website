import "../../styles/AudioModalRipper.css";
import React, { FC, useState } from "react";
import { Button, Form, Media, Modal } from "react-bootstrap";
import "../../styles/Modal.css";
import { AudioPlayer } from "./AudioPlayer";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  clip: {
    title?: string;
    enclosure?: {
      url?: string;
    };
  };
  id: number;
}
//u can leave the notes. they're helfpul.hha all good
const AudioModalRipper: FC<ModalProps> = ({
  isOpen,
  handleClose,
  clip,
  id,
}) => {
  const audioPlayer = document.querySelector(".audioPlayer");
  const audio = audioPlayer?.querySelector(".audioClip");
  debugger;
  console.log(audio);
  return (
    <Modal
      show={isOpen}
      clip={clip}
      onHide={handleClose}
      keyboard={false}
      backdrop="static"
      className="modalBack"
      id={id}
    >
      <Modal.Header closeButton>
        <Modal.Title>{clip.title}</Modal.Title>
      </Modal.Header>
      <div className="audioPlayer">
        <audio className="audioInput audioClip" src={clip.enclosure?.url}>
          Your browser does not support the audio element.
        </audio>
        <div className="player__controls">
          <div className="progress">
            {/* {AudioPlayer()} */}
            <div className="progress__filled"></div>
          </div>
          <button className="player__button toggle" title="Toggle Play">
            ►
          </button>
          <input
            type="range"
            name="startTime"
            className="player__slider"
            min="0"
            max="1"
            step="0.05"
            value="1"
          ></input>
          <input
            type="range"
            name="endTime"
            className="player__slider"
            min="0.5"
            max="2"
            step="0.1"
            value="1"
          ></input>
        </div>
      </div>
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Upload Gem</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AudioModalRipper;
