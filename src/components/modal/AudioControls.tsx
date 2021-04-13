import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";

export const Controls: React.FC<{
  audioMetaData: HTMLAudioElement | undefined;
}> = ({ audioMetaData }) => {
  const duration: number | undefined = audioMetaData?.duration;
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
  const toggle: HTMLButtonElement | null = document.querySelector(".toggle");
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState<number>(100);
  const [updateTime, setUpdateTime] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShow(true);
    if (audioMetaData?.duration != undefined) {
      // debugger;
      console.log(audioMetaData?.duration);
      setEndTime(audioMetaData?.duration);
    }
  }, [audioMetaData]);

  const calculateMinFromSec = (seconds: number) => {
    let min = seconds / 60;
    return Math.round(min);
  };

  const { Range } = Slider;
  function togglePlay() {
    setIsPlaying(!isPlaying);
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  }
  const log = (value: number) => {
    console.log(value);
  };

  const onMinChange = (e: Event) => {
    // const target = e.target as HTMLTextAreaElement;
    // if (target != null) {
    //   setStartTime(audio?.duration / 60);
    // }
  };
  // const onMaxChange = () => {
  //   if (audio != null) {
  //     setEndTime(Math.round(endTime / 60));
  //   }
  // };
  // const onSliderChange = (value: number) => {
  //   log(value);
  //   setUpdateTime(value);
  // };

  return audioMetaData ? (
    <div className="player__controls">
      <div id="rc-sliderDiv">
        <Range
          className="rc-slider"
          allowCross={false}
          defaultValue={[0, endTime]}
          min={0}
          max={100}
          // onChange={onSliderChange}
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
