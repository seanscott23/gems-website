import React, { ChangeEvent, MouseEvent } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { start } from "node:repl";
import Input from "../UI/Input";
import { setError } from "../../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Message from "../UI/Message";
import { time } from "node:console";

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
  const [endValue, setEndValue] = React.useState("");
  const [startValue, setStartValue] = React.useState("");
  const [showStartInput, setShowStartInput] = React.useState(false);
  const [showEndInput, setShowEndInput] = React.useState(false);
  // const endTimeButton: any = document.getElementById("endTimeButton");
  const { error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const leftProgressCircle: HTMLCollectionOf<Element> | any =
    document.getElementsByClassName("rc-slider-handle rc-slider-handle-1");
  const rightProgressCircle: HTMLCollectionOf<Element> | any =
    document.getElementsByClassName("rc-slider-handle rc-slider-handle-2");
  const sliderBar: HTMLCollectionOf<Element> | any =
    document.getElementsByClassName("rc-slider-track rc-slider-track-1");

  const { Range } = Slider;

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
    // if(audio){

    // }
    // setShowEndInput(false);
    // setShowStartInput(false);
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
    setShowEndInput(false);
    setShowStartInput(false);
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

  const endTimeToDecimal = (time: string) => {
    let split = time.split(":");
    let trueTime = 0;
    if (split.length === 1) {
      trueTime = parseFloat(split[0]);
    } else if (split.length === 2) {
      let min = parseFloat(split[0]);
      let sec = parseFloat(split[1]);
      let time2 = (min * 60 + sec) / 60;
      trueTime = time2;
    } else if (split.length === 3) {
      let hour = parseInt(split[0]);
      let min = parseInt(split[1]);
      let sec = parseInt(split[2]);
      let time3 = (hour * 60 * 60 + min * 60 + sec) / 60;
      trueTime = time3;
    }
    if (trueTime <= endTime) {
      return trueTime;
    } else if (trueTime > endTime) {
      return false;
    }
  };
  const startTimeToDecimal = (time: string) => {
    let split = time.split(":");
    let trueTime = 0;
    if (split.length === 1) {
      trueTime = parseFloat(split[0]);
    } else if (split.length === 2) {
      let min = parseFloat(split[0]);
      let sec = parseFloat(split[1]);
      let time2 = (min * 60 + sec) / 60;
      trueTime = time2;
    } else if (split.length === 3) {
      let hour = parseInt(split[0]);
      let min = parseInt(split[1]);
      let sec = parseInt(split[2]);
      let time3 = (hour * 60 * 60 + min * 60 + sec) / 60;
      trueTime = time3;
    }

    if (trueTime <= endTime) {
      return trueTime;
    } else if (trueTime > endTime) {
      return false;
    }
  };

  const getEndTime = () => {
    setShowEndInput(true);
    dispatch(setError(""));
    let val = showInputTime(endValue);
    if (audio) {
      audio.currentTime = startTime;
    }
    if (val) {
      let trueTime = endTimeToDecimal(val);
      if (
        trueTime &&
        audioMetaData &&
        trueTime < secondsToDecimal(audioMetaData.duration)
      ) {
        setEndTime(trueTime);
      } else {
        dispatch(setError("Please input a valid time"));
      }
    }
  };

  const getStartTime = () => {
    setShowStartInput(true);
    dispatch(setError(""));
    let val = showInputTime(startValue);

    if (val) {
      let trueTime = startTimeToDecimal(val);
      if (trueTime && audio && trueTime < secondsToDecimal(audio.duration)) {
        audio.currentTime = trueTime * 60;
        setStartTime(trueTime);
      } else {
        dispatch(setError("Please input a valid time"));
      }
    }
  };

  const showInputTime = (time: string) => {
    let finalTime = time.split(":");
    let endCompTime = showTime(endTime).toString().split(":");
    if (finalTime.length <= endCompTime.length) {
      if (finalTime.length === 2) {
        let min = parseInt(finalTime[0]);
        let sec = parseInt(finalTime[1]);
        if (min < 60 && sec < 60) {
          if (sec.toString().length === 2) {
            return min + ":" + sec;
          } else {
            return min + ":" + 0 + sec;
          }
        } else {
          dispatch(setError("Please input a valid time"));
        }
      } else if (finalTime.length === 1) {
        let sec = parseInt(finalTime[0]);
        if (sec < 60 && sec <= endTime) {
          if (sec.toString().length === 2) {
            return 0 + ":" + sec;
          } else {
            return 0 + ":" + 0 + sec;
          }
        } else {
          dispatch(setError("Please input a valid time"));
        }
      } else if (finalTime.length === 3) {
        let hour = parseInt(finalTime[0]);
        let min = parseInt(finalTime[1]);
        let sec = parseInt(finalTime[2]);
        if (hour < 60 && min < 60 && sec < 60) {
          if (sec.toString().length === 2) {
            return hour + ":" + min + ":" + sec;
          } else {
            return hour + ":" + min + ":" + 0 + sec;
          }
        } else {
          dispatch(setError("Please input a valid time"));
        }
      }
    } else {
      dispatch(setError("Please input a valid time"));
      return;
    }
  };

  const userStartTime = (e: React.ChangeEvent) => {
    let target: any = e.currentTarget;

    if (target.value === "" || !isNaN(parseFloat(target.value))) {
      if (target.value.includes(":")) {
        let chosen = startTimeToDecimal(target.value);
        if (
          chosen !== false &&
          target.value.length <= showTime(endTime).toString().length
        ) {
          setStartValue(target.value);
        }
      } else if (!target.value.includes(":") && target.value !== "") {
        let chosen = secondsToDecimal(target.value);
        if (chosen <= endTime && parseFloat(target.value) < 60) {
          setStartValue(target.value);
        }
      } else if (target.value === "") {
        setStartValue(target.value);
      }
    } else {
      setStartValue("");
      dispatch(setError("Please input a valid time"));
    }
    if (audio) {
      audio.currentTime = startTime;
    }
  };

  const userEndTime = (e: React.ChangeEvent) => {
    let target: any = e.currentTarget;

    if (target.value === "" || !isNaN(parseFloat(target.value))) {
      if (target.value.includes(":")) {
        let chosen = endTimeToDecimal(target.value);
        if (
          chosen !== false && chosen
            ? chosen > startTime
            : target.value.length <= showTime(endTime).toString().length
        ) {
          setEndValue(target.value);
        }
      } else if (!target.value.includes(":") && target.value !== "") {
        let chosen = secondsToDecimal(target.value);
        if (
          chosen <= endTime &&
          parseFloat(target.value) < 60 &&
          chosen > startTime
        ) {
          setEndValue(target.value);
        }
      } else if (target.value === "") {
        setEndValue(target.value);
      }
    } else {
      setEndValue("");
      dispatch(setError("Please input a valid time"));
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
          <div className="startTime">
            Start time:
            {showStartInput ? showInputTime(startValue) : showTime(startTime)}
          </div>
          <div className="endTime">
            End time:
            {showEndInput ? showInputTime(endValue) : showTime(endTime)}
          </div>
        </div>
      </div>
      <div className="audioInputs">
        <div className="startTimeInput">
          <input
            type="text"
            className="audioTime"
            placeholder="Start time"
            name="startTime"
            onChange={(e) => userStartTime(e)}
            value={startValue}
          />
          <Button
            className="inputTimeButton"
            id="startTimeButton"
            onClick={getStartTime}
          >
            Update
          </Button>
        </div>

        <div className="endTimeInput">
          <input
            type="text"
            className="audioTime"
            value={endValue}
            placeholder="End time"
            name="endTime"
            onChange={(e) => userEndTime(e)}
          />

          <Button
            className="inputTimeButton"
            id="endTimeButton"
            onClick={getEndTime}
          >
            Update
          </Button>
        </div>
        <div className="audioInputError">
          {error !== "" ? <Message type="danger" msg={error} /> : null}
        </div>
      </div>
    </div>
  ) : null;
};
