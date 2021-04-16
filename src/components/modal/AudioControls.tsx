import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef } from "react";
import { debug } from "webpack";
import { ProgressBar } from "react-bootstrap";

export const Controls: React.FC<{
  audioMetaData: HTMLAudioElement | undefined;
  isOpen: boolean;
}> = ({ audioMetaData, isOpen }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
  const toggle: HTMLButtonElement | null = document.querySelector(".toggle");
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(100);
  const leftProgressCircle:
    | HTMLCollectionOf<Element>
    | any = document.getElementsByClassName(
    "rc-slider-handle rc-slider-handle-1"
  );
  const rightProgressCircle:
    | HTMLCollectionOf<Element>
    | any = document.getElementsByClassName(
    "rc-slider-handle rc-slider-handle-2"
  );
  const sliderBar:
    | HTMLCollectionOf<Element>
    | any = document.getElementsByClassName(
    "rc-slider-track rc-slider-track-1"
  );

  const { Range } = Slider;

  const calculateTimeStamp = (seconds: number) => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);

    let hDisplay = h > 0 ? h : 0;
    let mDisplay = m > 0 ? m : 0;
    let sDisplay = s >= 0 ? s : 0;

    if (mDisplay == 0) {
      return sDisplay;
    } else {
      if (sDisplay <= 9) {
        return parseFloat(mDisplay + ".0" + sDisplay);
      }
      return parseFloat(mDisplay + "." + sDisplay);
    }
  };

  React.useEffect(() => {
    if (audioMetaData?.duration != undefined) {
      setEndTime(calculateTimeStamp(audioMetaData.duration) as number);
    }
    if (audio) {
      audio.ontimeupdate = function () {
        updateProgressBar();
      };
    }
  }, [audioMetaData, audio?.ontimeupdate]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  };

  const updateProgressBar = () => {
    if (audio) {
      let cTime = audio.currentTime as number;
      let audioCurrentTime = calculateTimeStamp(cTime) as number;
      setStartTime(audioCurrentTime);
    }

    if (leftProgressCircle[0] && audio) {
      let amountMoved = (audio.currentTime / audio.duration) * 100;
      let rightMoved = parseFloat(
        rightProgressCircle[3].style.left.slice(0, -1)
      );
      let rightPercent = parseFloat(rightMoved.toFixed(2));
      let rightMovedPct = 100 - rightPercent;
      let percent = parseFloat(amountMoved.toFixed(2));
      let widthPercent = 100 - percent - rightMovedPct;
      leftProgressCircle[3].style.left = percent + "%";
      sliderBar[3].style.left = percent + "%";
      sliderBar[3].style.width = widthPercent + "%";
    }
    checkStartStop();
  };

  const checkStartStop = () => {
    if (isOpen) {
      if (audio) {
        let rightPercent =
          parseFloat(rightProgressCircle[3].style.left.slice(0, -1)) / 100;
        let finalEnd = audio.duration * rightPercent;
        let endTime = calculateTimeStamp(finalEnd);
        let startTime = calculateTimeStamp(audio.currentTime);
        console.log(startTime);
        console.log(endTime);
        if (startTime === endTime) {
          audio.pause();
        }
      }
    } else if (audio) {
      audio.pause();
    }
  };

  const onMinChange = (e: number[]) => {
    setStartTime(calculateTimeStamp(e[0] * 60));
    setEndTime(calculateTimeStamp(e[1] * 60));
    if (audio) {
      audio.currentTime = e[0] * 60;
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
          // onAfterChange={(e) => updateScrubTime(e)}
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
