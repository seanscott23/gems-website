import "../../styles/AudioUpload.css";
import { useState, DragEvent } from "react";
import uploadPNG from "../../images/uploadgem.png";
import AudioFile from "./AudioFile";

function AudioUpload() {
  const [audiox, setAudiox] = useState<string | ArrayBuffer>("");

  function dropTargetRelease() {
    document
      .getElementsByClassName("signup-user-audio")[0]
      .classList.remove("beingDraggedOver");
  }

  const dragOverHandler = (ev: DragEvent<HTMLLabelElement>) => {
    ev.preventDefault();
    document
      .getElementsByClassName("signup-user-audio")[0]
      .classList.add("beingDraggedOver");
  };

  function checkIfImage(file: any) {
    return file && file["type"].split("/")[0] === "audio";
  }

  const dropHandler = (ev: DragEvent<HTMLLabelElement>) => {
    ev.stopPropagation();
    ev.preventDefault();

    const file = ev?.dataTransfer?.files[0];

    if (checkIfImage(file)) {
      presentAudio(file);
    } else {
      alert("File must be audio!");
    }

    dropTargetRelease();
  };

  function presentAudio(ev: any) {
    if (ev?.length !== 0) {
      var reader = new FileReader();
      const fileEvent = ev[0] === undefined ? ev : ev[0];

      reader.onload = function (e) {
        if (e.target?.result !== undefined && e.target.result !== null) {
          setAudiox(e.target?.result);
        }
      };
      reader.readAsDataURL(fileEvent);
    }
  }
  //added the line about null on 47  because of the double equals
  return (
    <div className="upload-box">
      <label
        htmlFor="fileElem"
        className="signup-user-audio"
        onDrop={(ev) => dropHandler(ev)}
        onDragOver={(ev) => dragOverHandler(ev)}
        onDragLeave={() => dropTargetRelease()}
      >
        <div className="preparing-4-drag">
          <input
            type="file"
            name="userAudio"
            id="fileElem"
            accept="audio/*"
            onChange={(e) => presentAudio(e?.target?.files)}
          />
          {!audiox ? (
            <div>
              <img alt="" src={uploadPNG} width="50px" height="50px" />
              <div>
                <p className="audio-label-instruction">
                  {" "}
                  Drag &amp; Drop A Gem{" "}
                </p>
              </div>
            </div>
          ) : (
            <AudioFile file={audiox} />
          )}
        </div>
      </label>
    </div>
  );
}
export default AudioUpload;
