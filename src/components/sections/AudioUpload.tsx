import "../../styles/AudioUpload.css"
import React, { useEffect, useState, DragEvent } from 'react';
import uploadPNG from "../../images/upload.png"

function AudioUpload() {

    const [audiox, setAudiox] = useState<string | ArrayBuffer>("");

    function dropTargetRelease() {
        document.getElementsByClassName("signup-user-photo")[0].classList.remove("beingDraggedOver")
    }
    

    const dragOverHandler = (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault();
        document.getElementsByClassName("signup-user-photo")[0].classList.add("beingDraggedOver")
      
    }

    function checkIfImage(file: any) {
        return file && file['type'].split('/')[0] === 'audio';
    }

   const dropHandler = (ev: DragEvent<HTMLLabelElement>) => {
        ev.stopPropagation();
        ev.preventDefault();
        const file = ev?.dataTransfer?.files[0]

        if (checkIfImage(file)) {
           console.log(file)

        }else {

        }
        dropTargetRelease()
    }

    function presentImage(ev: any) {
        // var reader = new FileReader();
        // var imgtag = document.getElementById("fileElem");
        // console.log("checkmate", imgtag)

        console.log(ev[0])
        var freader = new FileReader();

        freader.onload = function(e) {
            // player.src = e.target.result;
            if (e.target?.result != undefined) {
                setAudiox(e.target?.result)
                const audioPlayer = document.getElementById("audio_dropped_player")
                console.log(audioPlayer)
            }
            // console.log("whhahhaha", e.target?.result)
        };

        freader.readAsDataURL(ev[0]);
    }

    return(
        <div className="upload-box">

            <label htmlFor="fileElem" className="signup-user-photo"  onDrop={(ev) => dropHandler(ev)} onDragOver={ ev => dragOverHandler(ev)} onDragLeave={()=> dropTargetRelease()}> 
                <div className="preparing-4-drag">
                    <input type="file" name="userImage" id="fileElem" accept="audio/*"  onChange={(e) => presentImage(e?.target?.files)}/>
                       {!audiox ? <img src={ uploadPNG}  width="50px" height="50px" /> 
                       : <audio id="audio_dropped_player" src={audiox as string} preload="metadata" controls >
                            Your browser does not support the audio element.
                        </audio> }
                        <div>
                            <p className="image-label-instruction"> Drag &amp; Drop A Gem </p>
                        </div>
                </div>

                { /* <div className="uploading" hidden>
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
                    </div>  */ }
            </label>

        </div>
    );
}
export default AudioUpload;