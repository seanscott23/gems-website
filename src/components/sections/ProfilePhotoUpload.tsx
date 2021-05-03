import "../../styles/PhotoUpload.css";
import React, { useEffect, useState, DragEvent } from "react";
import uploadPNG from "../../images/upload.png";
import { submitPhoto } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

function ProfilePhotoUpload() {
  const { profilePhoto } = useSelector((state: RootState) => state.auth);
  const [photo, setPhoto] = useState<string | ArrayBuffer>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (profilePhoto?.length !== 0 && profilePhoto !== undefined) {
      setPhoto(profilePhoto);
    }
  }, [profilePhoto]);

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
          submitPhotoHandler(e.target?.result);
        }
      };
      reader.readAsDataURL(fileEvent);
    }
  }

  const submitPhotoHandler = async (photoUrl: string | ArrayBuffer) => {
    if (typeof photoUrl === "string") {
      await dispatch(submitPhoto(photoUrl));
    }
  };

  return (
    <div className="photo-section">
      <h2>Profile Photo</h2>
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
                    Update Profile Photo
                  </p>
                </div>
              </div>
            ) : typeof photo == "string" ? (
              <img src={photo} className="profileImage" />
            ) : null}
          </div>
        </label>
      </div>
    </div>
  );
}
export default ProfilePhotoUpload;
