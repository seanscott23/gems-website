import React, { FC, useState, useRef } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { Controls } from "./AudioControls";
// interface AudioPlayerProps {
//   url: string;
// }

export const AudioPlayer: React.FC<{
  url: string;
  isOpen: boolean;
  begin: number;
  end: number;
}> = ({ url, isOpen, begin, end }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioMetaData, setAudioMetaData] = useState<
    HTMLAudioElement | undefined
  >();

  React.useEffect(() => {
    setShow(true);
  }, [audioMetaData]);

  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioMetaData(audioRef.current);
    }
  };
  debugger

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
      {show ? <Controls audioMetaData={audioMetaData} isOpen={isOpen} begin={begin} end={end} /> : null}
    </div>
  ) : null;
};
