import React from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { start } from "node:repl";
import Input from "../UI/Input";

export const Controls: React.FC<{
  audioMetaData: HTMLAudioElement | undefined;
  isOpen: boolean;
  begin: number;
  end: number;
  handleTimeUpdate: (num1: number, num2: number) => void;
}> = ({ audioMetaData, isOpen, begin, end, handleTimeUpdate }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(1000);

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

  // const calculateTimeStamp = (seconds: number) => {
  //   let h = parseFloat((seconds / 3600).toFixed(0));
  //   let m = parseFloat(((seconds % 3600) / 60).toFixed(0));
  //   let s = parseFloat(((seconds % 3600) % 60).toFixed(0));
  //   let hDisplay = h > 0 ? h : 0;
  //   let mDisplay = m > 0 ? m : 0;
  //   let sDisplay = s >= 0 ? s : 0;
  //   debugger;
  //   if (mDisplay == 0 && sDisplay >= 10) {
  //     return parseFloat("0." + sDisplay);
  //   }
  //   if (mDisplay == 0 && sDisplay < 10) {
  //     return parseFloat("0.0" + sDisplay);
  //   } else {
  //     if (sDisplay <= 9) {
  //       return parseFloat(mDisplay + ".0" + sDisplay);
  //     } else {
  //       return parseFloat(mDisplay + "." + sDisplay);
  //     }
  //   }
  // };

  const secondsToDecimal = (seconds: number) => {
    // console.log(parseFloat((seconds / 60).toFixed(2)));
    return parseFloat((seconds / 60).toFixed(2));
  };
  React.useEffect(() => {
    if (audioMetaData?.duration != undefined && endTime == 1000) {
      setEndTime(secondsToDecimal(audioMetaData.duration) as number);
    }
    handleTimeUpdate(startTime, endTime);
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
      // audio.muted = true;
    } else {
      audio?.pause();
    }
  };

  const updateProgressBar = () => {
    // if (audio) {
    //   let cTime = audio.currentTime as number;

    //   let audioCurrentTime = secondsToDecimal(cTime) as number;
    //   setStartTime(audioCurrentTime);
    // }

    if (leftProgressCircle[leftProgressCircle.length - 1] && audio) {
      if (endTime > startTime) {
        handleTimeUpdate(startTime, endTime);
        setStartTime(secondsToDecimal(audio.currentTime));
        let leftAmountMoved =
          (startTime / secondsToDecimal(audio.duration)) * 100;
        // let rightMoved = parseFloat(
        //   rightProgressCircle[rightProgressCircle.length - 1].style.left.slice(
        //     0,
        //     -1
        //   )
        // );

        let rightMoved = (endTime / secondsToDecimal(audio.duration)) * 100;

        let rightPercent = parseFloat(rightMoved.toFixed(2));
        let rightMovedPct = parseFloat((100 - rightPercent).toFixed(2));

        rightProgressCircle[rightProgressCircle.length - 1].style.left =
          rightPercent.toString() + "%";

        let leftPercent = parseFloat(leftAmountMoved.toFixed(2));
        let widthPercent = 100 - leftPercent - rightMovedPct;
        leftProgressCircle[leftProgressCircle.length - 1].style.left =
          leftPercent + "%";
        sliderBar[leftProgressCircle.length - 1].style.left = leftPercent + "%";

        sliderBar[leftProgressCircle.length - 1].style.width =
          widthPercent + "%";
      }
    }
    checkStartStop();
  };

  const checkStartStop = () => {
    if (isOpen) {
      if (audio) {
        let rightPercent =
          parseFloat(
            rightProgressCircle[
              rightProgressCircle.length - 1
            ].style.left.slice(0, -1)
          ) / 100;
        let finalEnd = audio.duration * rightPercent;
        let end = secondsToDecimal(finalEnd);
        let start = secondsToDecimal(audio.currentTime);

        if (start === end) {
          audio.pause();
        }
      }
    } else if (audio) {
      audio.pause();
    }
  };

  const onMinChange = (e: number[]) => {
    setStartTime(e[0]);
    //can add logic here to check if playing and then only update endtime and not both
    setEndTime(e[1]);
    if (audio) {
      audio.currentTime = e[0] * 60;
    }
  };

  const showTime = (decimal: number) => {
    if (decimal < 60) {
      let string = decimal.toString().split(".");
      if (decimal != 0) {
        let min = string[0];
        let seconds;
        if (string[1]) {
          seconds = (parseFloat("." + string[1]) * 60).toFixed(0);
        } else {
          seconds = "0";
        }
        if (seconds.length === 2) {
          return min + ":" + seconds;
        } else {
          return min + ":" + 0 + seconds;
        }
      } else {
        return 0;
      }
    } else {
      let string = decimal.toString().split(".");
      let hour = (
        (parseInt(string[0]) - (parseInt(string[0]) % 60)) /
        60
      ).toString();

      let min = (parseInt(string[0]) % 60).toString();
      if (min.length < 2) {
        min = "0" + min;
      }
      let seconds;
      if (string[1]) {
        seconds = (parseFloat("." + string[1]) * 60).toFixed(0);
      } else {
        seconds = "0";
      }
      if (seconds.length === 2) {
        return hour + ":" + min + ":" + seconds;
      } else {
        return hour + ":" + min + ":" + 0 + seconds;
      }
    }
  };

  const inputEndTime = (e: React.ChangeEvent) => {
    let target: any = e.currentTarget;
    if (typeof parseInt(target.value) === "number" && audio) {
      setEndTime(parseInt(target.value));
    }
    if (audio) {
      audio.currentTime = startTime;
    }
  };
  // const checkKey = (e: KeyboardEvent) => {
  //   // e = e || window.event;
  //   if (audio && isOpen) {
  //     if (e.code == "ArrowLeft" && startTime > 0.15) {
  //       // audio.currentTime = audio.currentTime + 0.15;
  //       // setStartTime(audio.currentTime);
  //     } else if (e.code == "ArrowRight" && startTime < endTime - 0.15) {
  //       debugger;
  //       audio.currentTime = audio.currentTime + 0.15 * 60;
  //       // setStartTime(startTime);
  //     }
  //   } else if (audio) {
  //     audio.pause();
  //   }
  // };

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
          max={secondsToDecimal(audioMetaData.duration)}
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
          <div className="startTime">Start time: {showTime(startTime)}</div>
          <div className="endTime">End time: {showTime(endTime)}</div>
        </div>
      </div>
      <div className="audioInputs">
        <input
          type="text"
          className="audioTime"
          placeholder="Start time"
          name="startTime"
          // value={startTime}
          // onChange={() => setStartTime(startTime)}
        />
        <input
          type="text"
          className="audioTime"
          placeholder="End time"
          name="endTime"
          // value=""
          onChange={(e) => inputEndTime(e)}
        />
      </div>
    </div>
  ) : null;
};
