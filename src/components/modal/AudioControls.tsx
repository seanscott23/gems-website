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
  const startRange: HTMLDivElement | null = document.querySelector(
    ".rc-slider-handle-1"
  );
  // const endRange: HTMLDivElement | null = document.querySelector(
  //   ".rc-slider-handle-2"
  // );
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState<number>(100);
  const [updateTime, setUpdateTime] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);
  const { Range } = Slider;
  React.useEffect(() => {
    setShow(true);
    if (audioMetaData?.duration != undefined) {
      setEndTime(audioMetaData?.duration);
    }
  }, [audioMetaData]);

  const calculateMinFromSec = (seconds: number) => {
    let min = seconds / 60;
    return parseFloat(min.toFixed(2));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  };

  //   startRange.onChange = function() {
  //     myFunction()
  // };
  // }

  // const getValue = () => {
  //   let val = startRange?.getAttribute("aria-valuenow");
  //   console.log(val);
  // };

  // const ariaFunc = (e: number) => {
  //   console.log(e);
  // };

  const onMinChange = (e: number[]) => {
    let startRange: HTMLDivElement | any = document.querySelector(
      ".rc-slider-handle-1"
    );
    // debugger
    let val = startRange.ariaValueNow;
   
   
  };

  return audioMetaData ? (
    <div className="player__controls">
      <div id="rc-sliderDiv">
        <Range
          className="rc-slider"
          allowCross={false}
          defaultValue={[0, endTime]}
          min={startTime}
          max={parseFloat((audioMetaData.duration / 60).toFixed(2))}
          onChange={(e) => onMinChange(e)}
          // value={(e) => ariaFunc(e)}
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
          <div className="endTime">
            End time: {calculateMinFromSec(endTime)}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
