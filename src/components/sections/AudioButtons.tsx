import React, { FC, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitNewClip } from "../../store/actions/authActions";
import AudioModalRipper from "../modal/AudioModalRipper";
import "../../styles/AudioButtons.css";

interface Clip {
  title: string;
  enclosure: {
    url: string;
  };
}
export const AudioButtons: React.FC<{
  audioMetaData: HTMLAudioElement | undefined;
}> = ({ audioMetaData }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalState] = React.useState(false);
  const [begin, setBegin] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  let clip;
  if (audioMetaData) {
    clip = { title: "", enclosure: { url: audioMetaData.src } };
  }

  React.useEffect(() => {
    setShow(true);
    // if(audioMetaData.duration)
  }, [audioMetaData]);

  const handleTimeUpdate = (startPoint: number, endPoint: number) => {
    setBegin(startPoint);
    setEnd(endPoint);
  };
  const handleClose = () => {
    setModalState(!isModalOpen);
  };

  const submitHandler = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (audioMetaData) {
      e.preventDefault();
      setLoading(true);
      await dispatch(
        submitNewClip(audioMetaData.src, 0, audioMetaData.duration)
      );
      setLoading(false);
      history.push("/gem-form");
    }
  };

  const getAudioTime = () => {
    if (audioMetaData) {
      return audioMetaData.duration <= 600 ? true : false;
    } else {
      return false;
    }
  };
  // debugger;
  return audioMetaData ? (
    getAudioTime() ? (
      <div className="upload-ready">
        <Button id="upload-audio" onClick={submitHandler}>
          Upload audio
        </Button>
        <span className="button-or">Or</span>
        <div>
          <Button
            id="crop-audio"
            onClick={() => {
              setModalState(!isModalOpen);
            }}
          >
            Crop audio
          </Button>
          {clip ? (
            <AudioModalRipper
              isOpen={isModalOpen}
              handleClose={handleClose}
              clip={clip}
              id={1}
              begin={begin}
              end={end}
              handleTimeUpdate={handleTimeUpdate}
            />
          ) : null}
        </div>
      </div>
    ) : (
      <div>
        <Button
          id="crop-audio"
          onClick={() => {
            setModalState(!isModalOpen);
          }}
        >
          Crop audio
        </Button>
        {clip ? (
          <AudioModalRipper
            isOpen={isModalOpen}
            handleClose={handleClose}
            clip={clip}
            id={1}
            begin={begin}
            end={end}
            handleTimeUpdate={handleTimeUpdate}
          />
        ) : null}
      </div>
    )
  ) : null;
};

export default AudioButtons;
