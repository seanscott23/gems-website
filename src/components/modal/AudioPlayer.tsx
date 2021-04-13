import React, { FC, useState, useRef } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { Controls } from "./AudioControls";
// interface AudioPlayerProps {
//   url: string;
// }

export const AudioPlayer: React.FC<{
  url: string;
}> = ({ url }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [audioMetaData, setAudioMetaData] = useState<
    HTMLAudioElement | undefined
  >();
  React.useEffect(() => {
    setShow(true);
  }, []);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
      {show ? <Controls audioMetaData={audioMetaData} /> : null}
    </div>
  ) : null;
};

// const Controls = () => {
//   const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
//   const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
//   const toggle: HTMLButtonElement | null = document.querySelector(".toggle");
//   const [startTime, setStartTime] = React.useState(0);
//   const [endTime, setEndTime] = React.useState(100);
//   const [updateTime, setUpdateTime] = React.useState(0);
//   const { Range } = Slider;
//   function togglePlay() {
//     setIsPlaying(!isPlaying);
//     if (audio?.paused) {
//       audio.play();
//     } else {
//       audio?.pause();
//     }
//   }
//   const log = (value: number) => {
//     console.log(value);
//   };

//   const onMinChange = (e: Event) => {
//     debugger;
//     const target = e.target as HTMLTextAreaElement;
//     if (target != null) {
//       setStartTime(audio?.duration / 60);
//     }
//   };
//   const onMaxChange = (e: Event) => {
//     debugger;
//     // setEndTime(e.target.value);
//   };
//   const onSliderChange = (value: number) => {
//     log(value);
//     setUpdateTime(value);
//   };

//   return (
//     <div className="player__controls">
//       <div id="rc-sliderDiv">
//         <Range
//           className="rc-slider"
//           allowCross={false}
//           defaultValue={[0, 100]}
//           min={0}
//           max={endTime}
//           // onChange={onSliderChange}
//         />
//       </div>
//       <div className="control-bar">
//         <button
//           className="player__button toggle"
//           title="Toggle Play"
//           onClick={togglePlay}
//         >
//           {!isPlaying ? "►" : "❚ ❚"}
//         </button>
//         <div className="start-end-time">
//           <div className="startTime">Start time: {startTime}</div>
//           <div className="endTime">End time: {endTime}</div>
//         </div>
//       </div>
//     </div>
//   );
// };
