import React, { FC, useState, useRef } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { Controls } from "./AudioControls";


export const AudioPlayer: React.FC<{
  url: string;
  isOpen: boolean;
}> = ({ url, isOpen }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioMetaData, setAudioMetaData] = useState<
    HTMLAudioElement | undefined
  >();

  React.useEffect(() => {
    setShow(true);
  }, [audioMetaData]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioMetaData(audioRef.current);
    }
  };

  return show ? (
    <div className="audioDiv">
      <audio
        className="audioInput audioClip"
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        src={url}
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>
      {show ? <Controls audioMetaData={audioMetaData} isOpen={isOpen} /> : null}
    </div>
  ) : null;
};
