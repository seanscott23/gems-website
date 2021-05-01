import React, { FC } from "react";
import { useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUserGems } from "../../store/actions/gemSubmitAction";
import GemCard from "../sections/GemCard";
import "../../styles/Library.css";
import ProfilePhotoUpload from "../sections/ProfilePhotoUpload";

const Library: FC = () => {
  const { userGems, profilePhoto } = useSelector(
    (state: RootState) => state.auth
  );

  // const [gems, setGems] = React.useState(userGems);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const result = window.localStorage.getItem("all-gems");
  //   if (result) {
  //     setGems(JSON.parse(result));
  //   }
  // }, []);

  React.useEffect(() => {
    // localStorage.setItem("all-gems", JSON.stringify(userGems));
    dispatch(getUserGems());
  }, [userGems]);

  // const updatePhoto = () => {};

  return (
    <div>
      <div>
        <ProfilePhotoUpload></ProfilePhotoUpload>
      </div>
      <section className="library-section">
        <h1>Your gem library!</h1>
        <h6>
          This page is linked directly with your account on our app. Update or
          delete any gem within this page.
        </h6>
        <ListGroup id="allGems" as="ul">
          {userGems !== undefined
            ? userGems.map((gem: any) => (
                <GemCard gemID={gem[0]} gemInfo={gem[1]} key={gem[0]} />
              ))
            : null}
        </ListGroup>
      </section>
    </div>
  );
};

export default Library;
