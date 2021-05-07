import React, { FC, useEffect } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import AudioModalRipper from "../modal/AudioModalRipper";

interface Clip {
  title: string;
  enclosure: {
    url: string;
  };
}

const ReadyToUploadClips: FC<{
  posts: Array<any>;
}> = ({ posts }) => {
  const { rssFeedUrl, success } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalState] = React.useState(false);
  const [activeClip, setActiveClip] = React.useState<Clip | null>(null);
  const [begin, setBegin] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const handleClose = () => {
    setModalState(!isModalOpen);
  };
  const handleTimeUpdate = (startPoint: number, endPoint: number) => {
    setBegin(startPoint);
    setEnd(endPoint);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <div>
      {posts.map((clip: any, i: number) => (
        <ListGroup.Item as="li">
          <Card>
            <Card.Body>
              <Card.Title>{clip.title}</Card.Title>
              {/* <Card.Text>{clip.contentSnippet}</Card.Text> */}
              <Card.Link href={clip.enclosure.url}>Submit Gem</Card.Link>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </div>
  );
};

export default ReadyToUploadClips;

// <ListGroup id="readyToUpload" as="ul">
//   {currentReadyPosts.length > 0 ? (
//     <h3 style={{ textAlign: "center" }}>Ready to upload</h3>
//   ) : null}
//   {/* <SearchBar
//         input={input}
//         setInput={handleFilterList}
//         // handleChange={handleChange}
//       /> */}
//   {
//     <ReadyToUploadClips
//       posts={currentReadyPosts}
//       // clips={clips}
//       // input={input}
//       // setClips={setClips}
//     ></ReadyToUploadClips>
//   }
//   {currentReadyPosts.length > 0 ? (
//     <PaginationBar
//       postsPerPage={readyPostsPerPage}
//       totalPosts={readyItems.length}
//       currentPage={readyCurrentPage}
//       setCurrentPage={setReadyCurrentPage}
//       paginate={readyPaginate}
//     ></PaginationBar>
//   ) : null}
// </ListGroup>;

// const readyToUpload = () => {
//   const audioItems: Array<object> = [];
//   const allItems = rssFeedUrl.items;
//   allItems.map(async (currentItem: any) => {
//     if (parseInt(currentItem.itunes.duration) <= 600) {
//       audioItems.push(currentItem);
//     }
//   });
//   return audioItems;
// };
