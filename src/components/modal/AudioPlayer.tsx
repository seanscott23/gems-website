import React, { FC, useRef } from "react";
// import noUiSlider from "nouislider";
// import "nouislider/distribute/nouislider.css";
import Slider, { Range } from "rc-slider";
// import "../../assets/index.less";
import "rc-slider/assets/index.css";

// interface AudioPlayerProps {
//   url: string;
// }

export const AudioPlayer: React.FC<{
  url: string;
}> = ({ url }) => {
  const [show, setShow] = React.useState<boolean>(false);
  React.useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="audioDiv">
      <audio className="audioInput audioClip" src={url}>
        Your browser does not support the audio element.
      </audio>
      {show ? <Controls /> : null}
    </div>
  );
};

const Controls = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");
  const toggle: HTMLButtonElement | null = document.querySelector(".toggle");
  const [startTime, setStartTime] = React.useState(20);
  const [endTime, setEndTime] = React.useState(80);
  const [updateTime, setUpdateTime] = React.useState(0);
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
    debugger;
    // const target = e.target as HTMLTextAreaElement;
    // if (target != null) {
    //   setStartTime(target?.value);
    // }
  };
  const onMaxChange = (e: Event) => {
    debugger;
    // setEndTime(e.target.value);
  };
  const onSliderChange = (value: number) => {
    log(value);
    setUpdateTime(value);
  };

  return (
    <div className="player__controls">
      <div id="rc-sliderDiv">
        <Range
          className="rc-slider"
          allowCross={false}
          defaultValue={[0, 100]}
          min={0}
          max={endTime}
          // onChange={onSliderChange}
        />
      </div>
      <div className="style_play_btn">
        <button
          className="player__button toggle"
          title="Toggle Play"
          onClick={togglePlay}
         
        >
          {!isPlaying ? "►" : "❚ ❚"}
        </button>
      </div>
      {/* <div>
        <p style={{ color: "white" }}>
          {startTime}:{endTime}
        </p>
      </div> */}
    </div>
  );
};
