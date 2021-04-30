import React, { FC } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUserGems } from "../../store/actions/gemSubmitAction";
import GemCard from "../sections/GemCard";
import "../../styles/Library.css";

const Library: FC = () => {
  const { userGems } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserGems());
  }, [userGems]);

  return (
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
  );
};

export default Library;
