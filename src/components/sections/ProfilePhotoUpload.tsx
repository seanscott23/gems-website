import "../../styles/PhotoUpload.css";
import React, { useEffect, useState, DragEvent } from "react";
import uploadPNG from "../../images/upload.png";

function ProfilePhotoUpload() {
  const [photo, setPhoto] = useState<string | ArrayBuffer>("");

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
    return file && file["type"].split("/")[0] === "photo";
  }

  const dropHandler = (ev: DragEvent<HTMLLabelElement>) => {
    ev.stopPropagation();
    ev.preventDefault();

    const file = ev?.dataTransfer?.files[0];

    if (checkIfImage(file)) {
      presentPhoto(file);
    } else {
      alert("File must be an image of type jpg, png!");
    }

    dropTargetRelease();
  };

  function presentPhoto(ev: any) {
    if (ev?.length != 0) {
      var reader = new FileReader();
      const fileEvent = ev[0] == undefined ? ev : ev[0];

      reader.onload = function (e) {
        if (e.target?.result != undefined) {
          setPhoto(e.target?.result);
        }
      };
      reader.readAsDataURL(fileEvent);
    }
  }

  return (
    <div className="upload-box-photo">
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
            accept="image/*"
            onChange={(e) => presentPhoto(e?.target?.files)}
          />
          {!photo ? (
            <div>
              <img src={uploadPNG} width="50px" height="50px" />
              <div>
                <p className="image-label-instruction">
                  {" "}
                  Update Profile Photo{" "}
                </p>
              </div>
            </div>
          ) : ///add codde here to convert image
          null}
        </div>
      </label>
    </div>
  );
}
export default ProfilePhotoUpload;
