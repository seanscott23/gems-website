import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { start } from "node:repl";

export const Controls: React.FC<{
  audioMetaData: HTMLAudioElement | undefined;
  isOpen: boolean;
}> = ({ audioMetaData, isOpen }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
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
    let h = parseFloat((seconds / 3600).toFixed(0));
    let m = parseFloat(((seconds % 3600) / 60).toFixed(0));
    let s = parseFloat(((seconds % 3600) % 60).toFixed(0));
    let hDisplay = h > 0 ? h : 0;
    let mDisplay = m > 0 ? m : 0;
    let sDisplay = s >= 0 ? s : 0;
    // debugger;
    if (mDisplay == 0 && sDisplay >= 10) {
      return parseFloat("0." + sDisplay);
    }
    if (mDisplay == 0 && sDisplay < 10) {
      return parseFloat("0.0" + sDisplay);
    } else {
      if (sDisplay <= 9) {
        return parseFloat(mDisplay + ".0" + sDisplay);
      } else {
        return parseFloat(mDisplay + "." + sDisplay);
      }
    }
  };

  React.useEffect(() => {
    if (audioMetaData?.duration != undefined && endTime == 100) {
      setEndTime(calculateTimeStamp(audioMetaData.duration) as number);
    }
    if (audio) {
      audio.ontimeupdate = function () {
        updateProgressBar();
      };
    }
  }, [audioMetaData, audio?.ontimeupdate, startTime, endTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audio?.paused) {
      audio.play();
      audio.muted = true;
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

    if (leftProgressCircle[leftProgressCircle.length - 1] && audio) {
      if(endTime > startTime){
      setStartTime(calculateTimeStamp(audio.currentTime));
      let leftAmountMoved = (startTime / calculateTimeStamp(audio.duration)) * 100;
      let rightMoved = parseFloat(
        rightProgressCircle[4].style.left.slice(0, -1)
      );
      let rightPercent = parseFloat(rightMoved.toFixed(2));
      let rightMovedPct = parseFloat((100 - rightPercent).toFixed(2))
      let leftPercent = parseFloat(leftAmountMoved.toFixed(2));
      let widthPercent = 100 - leftPercent - rightMovedPct;
      console.log(leftPercent)
      console.log(rightMovedPct)
      console.log(widthPercent)
    // debugger
      leftProgressCircle[leftProgressCircle.length - 1].style.left = leftPercent + "%";
  
      sliderBar[leftProgressCircle.length - 1].style.left = leftPercent + "%";
      sliderBar[leftProgressCircle.length - 1].style.width = widthPercent + "%";
    }}
    checkStartStop();
  };

  const checkStartStop = () => {
    if (isOpen) {
      if (audio) {
        let rightPercent =
          parseFloat(rightProgressCircle[rightProgressCircle.length - 1].style.left.slice(0, -1)) / 100;
        let finalEnd = audio.duration * rightPercent;
        let endTime = calculateTimeStamp(finalEnd);
        let startTime = calculateTimeStamp(audio.currentTime);
        // console.log(startTime);
        // console.log(endTime);
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
    console.log(e[1] * 60)
    setEndTime(calculateTimeStamp(e[1] * 60));
    // debugger
    if (audio) {
      audio.currentTime = e[0] * 60;
    }
  };
  const checkKey = (e: KeyboardEvent) => {
    // e = e || window.event;
    if (audio && isOpen) {
      if (e.code == "ArrowLeft" && startTime > 0.15) {
        // audio.currentTime = audio.currentTime + 0.15;
        // setStartTime(audio.currentTime);
      } else if (e.code == "ArrowRight" && startTime < endTime - 0.15) {
        debugger;
        audio.currentTime = audio.currentTime + 0.15 * 60;
        // setStartTime(startTime);
      }
    } else if (audio) {
      audio.pause();
    }
  };

  // document.addEventListener("keyup", (e) => checkKey(e));

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
