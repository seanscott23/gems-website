import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { setError } from "../../store/actions/authActions";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Message from "../UI/Message";

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
    return parseFloat((seconds / 60).toFixed(2));
  };
  React.useEffect(() => {
    if (audioMetaData?.duration !== undefined && endTime === 1000) {
      setEndTime(secondsToDecimal(audioMetaData.duration) as number);
    }
    handleTimeUpdate(startTime, endTime);
    if (audio) {
      audio.ontimeupdate = function () {
        updateProgressBar();
      };
    }
  }, [
    audioMetaData,
    audio?.ontimeupdate,
    startTime,
    endTime,
    handleTimeUpdate,
    audio,
  ]);
  //would be good for useeffect to not have handletimeupdate, updateprogress and audio in
  //there because those change so often. test with putting them other places.
  //even netlify doesn't like it in useEffect.
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
      if (decimal !== 0) {
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

  const timeToDecimal = (time: string) => {
    let split = time.split(":");
    let filtered = split.filter((el) => el !== "");
    let trueTime = 0;
    if (filtered.length === 1) {
      trueTime = parseFloat(filtered[0]);
    } else if (filtered.length === 2) {
      let min = parseFloat(filtered[0]);
      let sec = parseFloat(filtered[1]);
      let time2 = (min * 60 + sec) / 60;
      trueTime = time2;
    } else if (filtered.length === 3) {
      let hour = parseInt(filtered[0]);
      let min = parseInt(filtered[1]);
      let sec = parseInt(filtered[2]);
      let time3 = (hour * 60 * 60 + min * 60 + sec) / 60;
      trueTime = time3;
    }
    if (audio && trueTime % 1 === 0) {
      if (trueTime < secondsToDecimal(audio.duration) * 60) {
        return trueTime;
      }
    } else if (audio && trueTime % 1 !== 0) {
      if (trueTime < secondsToDecimal(audio.duration)) {
        return trueTime;
      }
    }
  };

  const getEndTime = () => {
    dispatch(setError(""));
    let val = showInputTime(endValue);
    let startVal = timeToDecimal(startValue);
    if (val && startVal) {
      let trueTime = timeToDecimal(val);
      if (trueTime && trueTime > startVal) {
        if (audio) {
          audio.currentTime = startTime * 60;
        }
        setShowEndInput(true);
        setEndTime(trueTime);
      } else {
        dispatch(setError("End time must be greater than the start"));
      }
    } else if (val && !startVal) {
      let trueTime = timeToDecimal(val);
      if (trueTime && trueTime > startTime) {
        if (audio) {
          audio.currentTime = startTime * 60;
        }
        setShowEndInput(true);
        setEndTime(trueTime);
      } else {
        dispatch(setError("End time must be greater than the start"));
      }
    } else {
      dispatch(setError("Please input a valid time, example: 00:02:12"));
    }
  };

  const getStartTime = () => {
    dispatch(setError(""));
    let val = showInputTime(startValue);
    let endVal = timeToDecimal(endValue);
    if (val && endVal) {
      let trueTime = timeToDecimal(val);
      if (trueTime !== undefined && audio && trueTime < endVal) {
        setShowStartInput(true);
        audio.currentTime = trueTime * 60;
        setStartTime(trueTime);
      } else {
        dispatch(setError("Start time must be less than the end"));
      }
    } else if (val && !endVal) {
      let trueTime = timeToDecimal(val);
      if (trueTime !== undefined && audio && trueTime < endTime) {
        setShowStartInput(true);
        audio.currentTime = trueTime * 60;
        setStartTime(trueTime);
      } else {
        dispatch(setError("Start time must be less than the end"));
      }
    } else {
      dispatch(setError("Please input a valid time, example: 00:02:12"));
    }
  };

  const showInputTime = (time: string) => {
    let finalTime = time.split(":");
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
      if (sec < 60) {
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
      let newHour: any;
      let newMin: any;
      let newSec: any;
      if (hour < 60 && min < 60 && sec < 60) {
        hour < 10 ? (newHour = "0" + hour) : (newHour = hour);
        min < 10 ? (newMin = "0" + min) : (newMin = min);
        sec < 10 ? (newSec = "0" + sec) : (newSec = sec);
        return newHour + ":" + newMin + ":" + newSec;
      } else {
        dispatch(setError("Please input a valid time"));
      }
    }
  };

  const userStartTime = (e: React.ChangeEvent) => {
    setShowStartInput(false);
    let target: any = e.currentTarget;
    let regex = /^["0-9":]+$/;
    dispatch(setError(""));
    if (target.value === "" || regex.test(target.value)) {
      if (target.value.includes(":")) {
        let chosen = timeToDecimal(target.value);
        if (chosen !== undefined) {
          setStartValue(target.value);
        }
      } else if (!target.value.includes(":") && target.value !== "") {
        setStartValue(target.value);
      } else if (target.value === "") {
        setStartValue(target.value);
      }
    } else {
      dispatch(setError("Please input a valid time"));
    }
  };

  const userEndTime = (e: React.ChangeEvent) => {
    setShowEndInput(false);

    let target: any = e.currentTarget;
    let regex = /^["0-9":]+$/;
    dispatch(setError(""));
    if (target.value === "" || regex.test(target.value)) {
      if (target.value.includes(":")) {
        let chosen = timeToDecimal(target.value);

        if (chosen !== undefined) {
          setEndValue(target.value);
        }
      } else if (!target.value.includes(":") && target.value !== "") {
        setEndValue(target.value);
      } else if (target.value === "") {
        setEndValue(target.value);
      }
    } else {
      dispatch(setError("Please input a valid time, example: 00:02:12"));
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
          {!isPlaying ? "???" : "??? ???"}
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
