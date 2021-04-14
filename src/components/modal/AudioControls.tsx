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
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(100);
  const [updateTime, setUpdateTime] = React.useState(0);
  const [show, setShow] = React.useState<boolean>(false);
  const { Range } = Slider;
  const calculateMinFromSec = (seconds: number) => {
    let min = seconds / 60;
    return parseFloat(min.toFixed(2));
  };
  React.useEffect(() => {
    setShow(true);
    if (audioMetaData?.duration != undefined) {
      setEndTime(calculateMinFromSec(audioMetaData?.duration));
    }
  }, [audioMetaData]);

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
    // const leftDragSlider: HTMLCollectionOf<Element> = document.getElementsByClassName(
    //   "rc-slider-handle-dragging rc-slider-handle-1"
    // );
    // const rightDragSlider: HTMLCollectionOf<Element> = document.getElementsByClassName(
    //   "rc-slider-handle-dragging rc-slider-handle-2"
    // );
    // if (rightDragSlider.length != 0) {
    //   let currentSlider: HTMLDivElement = rightDragSlider[0] as HTMLDivElement;
    //   let valueMoved = currentSlider.style.left;
    //   let moved = parseFloat(
    //     (
    //       parseFloat(valueMoved.substring(0, valueMoved.length - 1)) / 100
    //     ).toFixed(2)
    //   );
    //   let stringValue = currentSlider.getAttribute("aria-valuemax");
    //   if (stringValue != null) {
    //     let maxValue = parseFloat(stringValue);

    //     let freshEndTime = parseFloat((maxValue * moved).toFixed(2));
    //     console.log(freshEndTime);
    //     setEndTime(freshEndTime);
    //   }
    // }
    // if (leftDragSlider.length != 0) {
    //   let currentSlider: HTMLDivElement = leftDragSlider[0] as HTMLDivElement;
    //   let valueMoved = currentSlider.style.left;
    //   let moved = parseFloat(
    //     (
    //       parseFloat(valueMoved.substring(0, valueMoved.length - 1)) / 100
    //     ).toFixed(2)
    //   );
    //   let stringValue = currentSlider.getAttribute("aria-valuemax");
    //   if (stringValue != null) {
    //     let maxValue = parseFloat(stringValue);

    //     let freshStartTime = parseFloat((maxValue * moved).toFixed(2));
    //     console.log(freshStartTime);
    //     setStartTime(freshStartTime);
    //   }
    // }
  };

  // const onClickChange = (e: number[]) => {
  //   // const clickSlider1 = HTMLDivElement | any = document.querySelector(
  //   //   ".rc-slider-handle-1"
  //   // );
  //   console.log(e);
  // };

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
