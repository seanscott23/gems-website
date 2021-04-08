import "../../styles/AudioUpload.css"
import React, { useEffect, useState, DragEvent } from 'react';
import uploadPNG from "../../images/upload.png"

function AudioUpload() {

    const [userImage, setUserImage] = useState("");

    function dropTargetRelease() {
        document.getElementsByClassName("signup-user-photo")[0].classList.remove("beingDraggedOver")
    }
    

    const dragOverHandler = (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault();
       
        document.getElementsByClassName("signup-user-photo")[0].classList.add("beingDraggedOver")
      
    }

    function checkIfImage(file: any) {
        return file && file['type'].split('/')[0] === 'image';
    }

   const dropHandler = (ev: DragEvent<HTMLLabelElement>) => {
       let event = ev
      
        event.stopPropagation();
        event.preventDefault();

        const file = event?.dataTransfer?.files[0]

        if (checkIfImage(file)) {
            // presentImage(file)
        }else {

        }
        dropTargetRelease()
    }

    function presentImage(ev: any) {
        var reader = new FileReader();
        var imgtag = document.getElementById("fileElem");

        reader.onload = function(event) {
            // imgtag.src = event?.target?.result;
            // setUserImage(imgtag?.src)
            // values.userImage = imgtag?.src
        };

        reader.readAsDataURL(ev);
    }

    return(
        <div className="upload-box">

            <label htmlFor="fileElem" className="signup-user-photo"  onDrop={(ev) => dropHandler(ev)} onDragOver={ ev => dragOverHandler(ev)} onDragLeave={()=> dropTargetRelease()}> 
                <div className="preparing-4-drag">
                    <input type="file" name="userImage" id="fileElem" accept="audio/*"  onChange={(e) => presentImage(e?.target?.files?[0]: "")}/>
                        <img src={userImage || uploadPNG}  width="50px" height="50px" />
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