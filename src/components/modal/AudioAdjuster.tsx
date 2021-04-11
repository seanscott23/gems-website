import { FC } from "react";

export const AudioAdjuster = () => {
  let start: number | undefined = document.querySelector("audio")?.currentTime;
  let end: number | undefined = document.querySelector("audio")?.duration;

  console.log(start);
  console.log(end);

  return <div></div>;
};
