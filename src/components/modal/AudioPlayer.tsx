import { FC } from "react";

export const AudioPlayer = (url: string) => {
  const audioPlayer = document.querySelector(".audioPlayer");
  const audio: HTMLAudioElement | null | undefined = audioPlayer?.querySelector(
    ".audioClip"
  );
  const progress = audioPlayer?.querySelector(".progress");
  const progressBar = audioPlayer?.querySelector(".progress__filled");
  const toggle: HTMLButtonElement | null | undefined = audioPlayer?.querySelector(".toggle");
  const skipButtons = audioPlayer?.querySelectorAll("[data-skip]");
  const ranges = audioPlayer?.querySelectorAll(".player__slider");
 
  /* Build out functions */

  function togglePlay() {
    if (audio?.paused) {
      audio.play();
    } else {
      audio?.pause();
    }
  }

  function updateButton(this: any) {
    const icon = this.paused ? "►" : "❚ ❚";
    console.log(icon);
    if (toggle != null) {
    toggle.innerHTML = icon}
  }

  function skip(this: any) {
    if (audio != null){
    audio.currentTime += parseFloat(this.dataset.skip)}
  }

  function handleRangeUpdate(this: any) {
        if (audio != null){
    audio?[this.name] = this.value
        }
  }

  function handleProgress() {
    const percent = (audio?.currentTime / audio?.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e: Event) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * audio?.duration;
    audio?.currentTime = scrubTime;
  }

  /* Hook up the event listeners */
  audio.addEventListener("click", togglePlay);

  audio.addEventListener("timeupdate", handleProgress);

  toggle.addEventListener("click", togglePlay);
  skipButtons.forEach((button) => button.addEventListener("click", skip));
  ranges.forEach((range) =>
    range.addEventListener("change", handleRangeUpdate)
  );
  ranges.forEach((range) =>
    range.addEventListener("mousemove", handleRangeUpdate)
  );

  let mousedown = false;
   audio?.addEventListener("play", updateButton);
  audio?.addEventListener("pause", updateButton);
  progress.addEventListener("click", scrub);
  progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
  progress.addEventListener("mousedown", () => (mousedown = true));
  progress.addEventListener("mouseup", () => (mousedown = false));

  return (
    <div className="audioPlayer">
      <audio className="audioInput audioClip" src={url}>
        Your browser does not support the audio element.
      </audio>
      <div className="player__controls">
        <div className="progress">
          <div className="progress__filled"></div>
        </div>
        <button className="player__button toggle" title="Toggle Play">
          ►
        </button>
        <input
          type="range"
          name="startTime"
          className="player__slider"
          min="0"
          max="1"
          step="0.05"
          value="1"
        ></input>
        <input
          type="range"
          name="endTime"
          className="player__slider"
          min="0.5"
          max="2"
          step="0.1"
          value="1"
        ></input>
      </div>
    </div>
  );
};
