import React, { FC, useState } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "../../styles/Library.css";
import ProfilePhotoUpload from "../sections/ProfilePhotoUpload";
import GemPagination from "../sections/GemPagination";
import PaginationBar from "../sections/PaginationBar";
import { getUserGems } from "../../store/actions/gemSubmitAction";

const Library: FC = () => {
  const { userGems, user } = useSelector((state: RootState) => state.auth);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userGems.slice(indexOfFirstPost, indexOfLastPost);
  const dispatch = useDispatch();

  React.useEffect(() => {
  }, [user?.profilePhoto, currentPosts]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return userGems.length > 0 ? (
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
          <GemPagination posts={currentPosts}></GemPagination>
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
