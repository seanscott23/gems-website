import React, { FC } from "react";
import { useEffect } from "react";
import { Form, ListGroup, Pagination } from "react-bootstrap";
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
  const [postsPerPage, setPostsPerPage] = userState(10);
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
  }, [userGems, profilePhoto]);

  const getIndex = (index: number) => {
    let num = userGems.length - 1;
    return num - index;
  };

  const numPages = () => {
    let total;
    if (userGems.length > 0) {
      if (userGems.length <= 10) {
        total = 1;
      } else if (userGems.length > 10 && userGems.length < 100) {
        let length = userGems.length.toString();
        let splitNum = length.split("")[0];
        if (length.split("")[1] === "0") {
          total = parseInt(splitNum);
        } else {
          total = parseInt(splitNum) + 1;
        }
      } else if (userGems.length >= 100 && userGems.length < 1000) {
        let length = userGems.length.toString();
        let splitNum = length.substring(0, 2);
        if (length.substring(2) === "0") {
          total = parseInt(splitNum);
        } else {
          total = parseInt(splitNum) + 1;
        }
      }
    }
    return total;
  };

  let items = [];
  let active = numPages() !== undefined ? numPages() : 1;
  if (active) {
    for (let number = 1; number <= active; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
            ? userGems.map((gem: any, i: number) => (
                <GemCard gemID={gem[0]} gemInfo={gem[1]} index={getIndex(i)} />
              ))
            : null}
        </ListGroup>
        <Pagination>{items}</Pagination>
      </section>
    </div>
  );
};

export default Library;
function userState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
