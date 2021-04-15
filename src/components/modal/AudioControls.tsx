import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";
import { debug } from "webpack";
import { ProgressBar } from "react-bootstrap";

export const Controls: React.FC<{
  audioMetaData: HTMLAudioElement | undefined;
}> = ({ audioMetaData }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
  const toggle: HTMLButtonElement | null = document.querySelector(".toggle");
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(100);
  const rightProgressBar:
    | HTMLCollectionOf<Element>
    | any = document.getElementsByClassName(
    "rc-slider-handle rc-slider-handle-1 rc-slider-handle-dragging rc-slider-handle-click-focused"
  );
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
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setInterval(() => setStartTime(startTime + 1), 1000);
    } else {
      return () => clearInterval(timer);
    }
  }, [audioMetaData, startTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  };

  // const playNew = (source: string, time: number) => {
  //   let newAudio = new Audio(source);
  //   newAudio.loop = true;
  //   newAudio.play();
  //   setTimeout(() => {
  //     newAudio.pause();
  //   }, time);
  // };

  const onMinChange = (e: number[]) => {
    setStartTime(e[0]);
    setEndTime(e[1]);
    // if (rightProgressBar[0]) {
    //   rightProgressBar[0].ariaValueNow = e[1];
    // }

    // parseFloat(rightProgressBar[0].getAttribute("aria-valuenow"))
  };
  // let currentTime: number = 0;
  // if (audio) {
  //   currentTime = audio.currentTime;
  // }
  const updateScrubTime = (e: number[]) => {
    console.log(e[0]);

    if (audio) {
      audio.oncanplay = () => {
        // result = audio.src.split("#t=");
        // final = result[0] + "#t=" + startTime;
        // let newAudio = new Audio(final);
        // newAudio.loop = true;
        // newAudio.play();
        audio.currentTime = startTime;
      };
    }
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
          onAfterChange={(e) => updateScrubTime(e)}
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
