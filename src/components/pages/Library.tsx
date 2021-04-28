import React, { FC } from "react";
import { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUserGems } from "../../store/actions/gemSubmitAction";
import GemCard from "../sections/GemCard";

const Library: FC = () => {
  const { userGems, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {}, [userGems]);

  const getGemCard = userGems.map((gem: any) => (
    <GemCard gemID={gem[0]} gemInfo={gem[1]} />
  ));

  // debugger;
  return (
    <section className="section">
      <h1>Library Page!</h1>
      {/* <Container className="library-container"> */}
      <ListGroup id="allGems" as="ul">
        {getGemCard}
      </ListGroup>
      {/* </Container> */}
    </section>
  );
};

export default Library;
