import React, { FC, useState, useRef } from "react";
import { Button } from "react-bootstrap";

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
  const [isModalOpen, setModalState] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
    // if(audioMetaData.duration)
  }, [audioMetaData]);

  return audioMetaData ? (
    <Button
      className="crop-upload"
      onClick={() => {
        setModalState(!isModalOpen);
      }}
    >
      Crop audio
    </Button>
  ) : (
    <Button
      className="upload-audio"
      onClick={() => {
        setModalState(!isModalOpen);
      }}
    >
      Upload audio
    </Button>
  );
};

export default AudioButtons;
