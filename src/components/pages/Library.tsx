import React, { FC, useState } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "../../styles/Library.css";
import SearchBar from "../sections/SearchBar";
import GemPagination from "../sections/GemPagination";
import PaginationBar from "../sections/PaginationBar";
import { getUserGems } from "../../store/actions/gemSubmitAction";
import { useHistory } from "react-router-dom";

const Library: FC = () => {
  const { userGems } = useSelector((state: RootState) => state.auth);
  if (userGems.length === 0) {
    getUserGems();
  }
  let storedGems: any[] = [];
  if (userGems.length > 0) {
    window.localStorage.setItem("userGems", JSON.stringify(userGems));
  }
  if (userGems.length <= storedGems.length) {
    let newURL = window.localStorage.getItem("userGems");
    storedGems = newURL ? JSON.parse(newURL) : [];
  } else if (userGems.length > storedGems.length) {
    window.localStorage.setItem("userGems", JSON.stringify(userGems));
    let newURL = window.localStorage.getItem("userGems");
    storedGems = newURL ? JSON.parse(newURL) : [];
  }

  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = storedGems.slice(indexOfFirstPost, indexOfLastPost);
  const [input, setInput] = useState<string>("");
  const [clips, setClips] = useState(storedGems);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if (storedGems.length === 0) {
      getUserGems();
    }
    return () => {
      getUserGems();
    };
  }, [currentPosts, userGems]);

  const handleFilterList = (input: string) => {
    const filtered = storedGems.filter((clip: any) => {
      return input === ""
        ? clip
        : clip[1].title.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setClips(filtered);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return storedGems.length > 0 ? (
    <div>
      <section className="library-section">
        {/* <h1>Your gem library!</h1>
        <h6>
          This page is linked directly with your account on our app. Update or
          delete any gem within this page.
        </h6> */}
        <SearchBar input={input} setInput={handleFilterList} />
        <ListGroup id="allGems" as="ul">
          <GemPagination
            posts={currentPosts}
            clips={clips}
            input={input}
            setClips={setClips}
          ></GemPagination>
          <PaginationBar
            postsPerPage={postsPerPage}
            totalPosts={userGems.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
          ></PaginationBar>
        </ListGroup>
      </section>
    </div>
  ) : (
    <h1 className="noGem-h1">
      You have no gems yet. Please upload a gem first.
    </h1>
  );
};

export default Library;
