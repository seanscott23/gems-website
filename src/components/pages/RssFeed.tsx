import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/RssFeed.css";
import ReturnHTML from "../rss/ReturnHtml";

import PaginationBar from "../sections/PaginationBar";
import SearchBar from "../sections/SearchBar";

const RssFeed: FC = () => {
  const { rssFeedUrl, success, userGems } = useSelector(
    (state: RootState) => state.auth
  );
  const [input, setInput] = useState<string>("");

  const [isModalOpen, setModalState] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const items = rssFeedUrl.items;
  const [clips, setClips] = useState(items);

  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFilterList = (input: string) => {
    const filtered = items.filter((clip: any) => {
      return input === ""
        ? clip
        : clip.title.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setClips(filtered);
  };

  return (
    <section className="rss-container">
      <div className="rss-columns">
        <ListGroup id="needToBeTrimmed" as="ul">
          <h3 style={{ textAlign: "center" }}>
            Upload or Crop these items to your desired length.
          </h3>
          <SearchBar input={input} setInput={handleFilterList} />
          <ReturnHTML
            posts={currentPosts}
            clips={clips}
            input={input}
            setClips={setClips}
          ></ReturnHTML>
          <PaginationBar
            postsPerPage={postsPerPage}
            totalPosts={items.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
          ></PaginationBar>
        </ListGroup>
      </div>
    </section>
  );
};

export default RssFeed;
