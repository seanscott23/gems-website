import React, { FC, useState, useRef } from "react";
import AudioButtons from "./AudioButtons";
export const AudioFile: React.FC<{
  file: any;
}> = ({ file }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioMetaData, setAudioMetaData] = useState<
    HTMLAudioElement | undefined
  >();

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioMetaData(audioRef.current);
    }
  };

  React.useEffect(() => {
    setShow(true);
  }, [audioMetaData]);

  return show ? (
    <div>
      <audio
        id="audio_dropped_player"
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        src={file as string}
        preload="metadata"
        controls
      >
        Your browser does not support the audio element.
      </audio>
      <AudioButtons audioMetaData={audioMetaData} />
    </div>
  ) : null;
};

export default AudioFile;
