import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";

export const Controls: React.FC<{
  audioMetaData: HTMLAudioElement | undefined;
}> = ({ audioMetaData }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
  const toggle: HTMLButtonElement | null = document.querySelector(".toggle");
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(100);

  const { Range } = Slider;
  // let timeStamp = useRef(audioMetaData);
  // const {duration} = timeStamp.current

  const calculateMinFromSec = (seconds: number) => {
    let min = seconds / 60;
    return parseFloat(min.toFixed(2));
  };

  React.useEffect(() => {
    if (audioMetaData?.duration != undefined) {
      setEndTime(calculateMinFromSec(audioMetaData?.duration));
    }
    const timer: ReturnType<typeof setTimeout>;
    if(isPlaying){
     timer =
      setInterval(() => 
        setStartTime(startTime + 1)
      , 1000);
    }else{return () => clearInterval(timer)}
   
  }, [audioMetaData, startTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  };

  const onMinChange = (e: number[]) => {
    setStartTime(e[0]);
    setEndTime(e[1]);
  };


  return audioMetaData ? (
    <div className="player__controls">
      <div id="rc-sliderDiv">
        <Range
          className="rc-slider"
          allowCross={false}
          defaultValue={[0, endTime]}
          step={0.01}
          min={0}
          max={parseFloat((audioMetaData.duration / 60).toFixed(2))}
          onChange={(e) => onMinChange(e)}
        />
      </div>
      <div className="control-bar">
        <button
          className="player__button toggle"
          title="Toggle Play"
          onClick={togglePlay}
        >
          {!isPlaying ? "►" : "❚ ❚"}
        </button>

        <div className="start-end-time">
          <div className="startTime">Start time: {startTime}</div>
          <div className="endTime">End time: {endTime}</div>
        </div>
      </div>
    </div>
  ) : null;
};
