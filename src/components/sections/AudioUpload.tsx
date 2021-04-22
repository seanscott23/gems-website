import "../../styles/AudioUpload.css";
import React, { useEffect, useState, DragEvent } from "react";
import uploadPNG from "../../images/upload.png";
import AudioFile from "./AudioFile";

function AudioUpload() {
  const [audiox, setAudiox] = useState<string | ArrayBuffer>("");

  function dropTargetRelease() {
    document
      .getElementsByClassName("signup-user-photo")[0]
      .classList.remove("beingDraggedOver");
  }

  const dragOverHandler = (ev: DragEvent<HTMLLabelElement>) => {
    ev.preventDefault();
    document
      .getElementsByClassName("signup-user-photo")[0]
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
      presentAudio(file)
    } 

    dropTargetRelease();
  };

  function presentAudio(ev: any) {
   
    console.log("hehheh ",ev?.length)
    if (ev?.length != 0) {
      var reader = new FileReader();

      reader.onload = function (e) {
        if (e.target?.result != undefined) {
          setAudiox(e.target?.result);
          const audioPlayer = document.getElementById("audio_dropped_player");
          console.log(audioPlayer);
        }
      };
      const fileEvent = ev[0] == undefined ? ev : ev[0]
      reader.readAsDataURL(fileEvent);
    }
  }

  //   const returnAudio = (url: string | ArrayBuffer) => {
  //     return url ? true : false;
  //   };

  return (
    <div className="upload-box">
      <label
        htmlFor="fileElem"
        className="signup-user-photo"
        onDrop={(ev) => dropHandler(ev)}
        onDragOver={(ev) => dragOverHandler(ev)}
        onDragLeave={() => dropTargetRelease()}
      >
        <div className="preparing-4-drag">
          <input
            type="file"
            name="userImage"
            id="fileElem"
            accept="audio/*"
            onChange={(e) => presentAudio(e?.target?.files)}
          />
          {!audiox ? (
            <img src={uploadPNG} width="50px" height="50px" />
          ) : (
            <AudioFile file={audiox} />
          )}
          <div>
            <p className="image-label-instruction"> Drag &amp; Drop A Gem </p>
          </div>
        </div>

        {/* <div className="uploading" hidden>
                            <span> Uploading... </span>
                        </div>
                        <div className="success" hidden>
                            <img className="dragdrop-image" src={upload}  width="50px" height="50px" />
                            <div>
                                <p className="dragdrop-message"> Successful upload! </p>
                            </div>
                        </div> 
                        <div className="failure" hidden>
                            <img className="dragdrop-image" src={upload}  width="50px" height="50px" />
                            <div>
                                <p className="dragdrop-message"> Failure uploading! </p>
                            </div>
                    </div>  */}
      </label>
    </div>
  );
}
export default AudioUpload;
