import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/RssFeed.css";
import ReturnHTML from "../rss/ReturnHtml";
import ReadyToUploadClips from "../rss/ReadyToUploadClips";
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
  const [readyPostsPerPage, setReadyPostsPerPage] = useState(10);
  const [readyCurrentPage, setReadyCurrentPage] = useState(1);
  const readyIndexLast = readyCurrentPage * readyPostsPerPage;
  const readyIndexFirst = readyIndexLast * readyPostsPerPage;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const readyToUpload = () => {
    const audioItems: Array<object> = [];
    const allItems = rssFeedUrl.items;
    allItems.map(async (currentItem: any) => {
      if (parseInt(currentItem.itunes.duration) <= 600) {
        audioItems.push(currentItem);
      }
    });
    return audioItems;
  };

  const audioClipsTooLong = () => {
    const audioItems: Array<object> = [];
    const allItems = rssFeedUrl.items;
    allItems.map(async (currentItem: any) => {
      if (parseInt(currentItem.itunes.duration) > 600) {
        audioItems.push(currentItem);
      }
    });
    return audioItems;
  };
  const items = audioClipsTooLong();
  const [clips, setClips] = useState(items);
  const readyItems = readyToUpload();
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const currentReadyPosts = readyItems.slice(readyIndexFirst, readyIndexLast);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const readyPaginate = (pageNumber: number) => setReadyCurrentPage(pageNumber);

  // const handleChange = () => {
  //   // setInput("");
  //   setClips(items);
  // };

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
        <ListGroup id="readyToUpload" as="ul">
          {currentReadyPosts.length > 0 ? (
            <h3 style={{ textAlign: "center" }}>Ready to upload</h3>
          ) : null}
          {/* <SearchBar
            input={input}
            setInput={handleFilterList}
            // handleChange={handleChange}
          /> */}
          {
            <ReadyToUploadClips
              posts={currentReadyPosts}
              // clips={clips}
              // input={input}
              // setClips={setClips}
            ></ReadyToUploadClips>
          }
          {currentReadyPosts.length > 0 ? (
            <PaginationBar
              postsPerPage={readyPostsPerPage}
              totalPosts={readyItems.length}
              currentPage={readyCurrentPage}
              setCurrentPage={setReadyCurrentPage}
              paginate={readyPaginate}
            ></PaginationBar>
          ) : null}
        </ListGroup>
        <ListGroup id="needToBeTrimmed" as="ul">
          <h3 style={{ textAlign: "center" }}>
            These clips need to be trimmed
          </h3>
          <SearchBar
            input={input}
            setInput={handleFilterList}
            // handleChange={handleChange}
          />
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
