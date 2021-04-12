import React, { FC, useRef } from "react";
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

interface AudioPlayerProps {
  url: string;
}

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
      {/* <div id="slider"></div> */}
      {show ? <Controls /> : null}
    </div>
  );
};

const Controls = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [showSlider, setShowSlider] = React.useState<boolean>(false);
  React.useEffect(() => {
    setShowSlider(true);
  }, []);

  const audio: HTMLAudioElement | null = document.querySelector(".audioClip");

  const toggle: HTMLButtonElement | null = document.querySelector(".toggle");

  function togglePlay() {
    setIsPlaying(!isPlaying);
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  }

  const [startTime, setStartTime] = React.useState(20);
  const [endTime, setEndTime] = React.useState(80);
  let Result;
  let slider: HTMLElement | null = document.createElement("div");
  if (slider != null) {
    Result = noUiSlider.create(slider, {
      start: [startTime, endTime],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    });
  }

  return (
    <div className="player__controls">
      <Result />
      <button
        className="player__button toggle"
        title="Toggle Play"
        onClick={togglePlay}
        style={{ background: "black" }}
      >
        {!isPlaying ? "►" : "❚ ❚"}
      </button>
      <div>
        <p style={{ color: "white" }}>
          {startTime}:{endTime}
        </p>
      </div>
    </div>
  );
};
