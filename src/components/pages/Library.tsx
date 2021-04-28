import React, { FC } from "react";
import { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUserGems } from "../../store/actions/gemSubmitAction";
import GemCard from "../sections/GemCard";
import "../../styles/Library.css";

const Library: FC = () => {
  const { userGems, user } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {}, []);

  const getGemCard = userGems.map((gem: any) => (
    <GemCard gemID={gem[0]} gemInfo={gem[1]} />
  ));

  // debugger;
  return (
    <section className="library-section">
      <h1>Your gem library!</h1>
      <h6>
        This page is linked directly with your account on our app. Update or
        delete any gem within this page.
      </h6>
      <ListGroup id="allGems" as="ul">
        {getGemCard}
      </ListGroup>
    </section>
  );
};

export default Library;
