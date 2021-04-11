import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/RssFeed.css";
import { AudioModalRipper } from "./AudioModalRipper";

const RssFeed: FC = () => {
  const { rssFeedUrl, success } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalState] = useState(false);
  const toggleModal = (i: number) => {
    setModalState(!isModalOpen);
  };
  const handleClose = () => {
    setModalState(!isModalOpen);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  // const submitHandler = (e: FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   dispatch(submitGemForm({ rssFeed }, () => setLoading(false)));
  // // };
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

  const returnHTML = () => {
    const items = audioClipsTooLong();
    let result: any[] = [];
    result = items.map((clip: any, i: number) => {
      let li = (
        <ListGroup.Item as="li">
          <Card>
            <Card.Body>
              <Card.Title>{clip.title}</Card.Title>
              {/* <Card.Text>{clip.contentSnippet}</Card.Text> */}
              {/* <Card.Link href={clip.enclosure.url} onClick={showModal}>Trim audio</Card.Link> */}
              <Button onClick={() => toggleModal(i)}>Trim audio</Button>
              {returnModal(i)}
              {/* <AudioModalRipper
                show={isModalOpen}
                handleClose={toggleModal}
                title={clip.title}
                url={clip.enclosure.url}
                key={i}
              ></AudioModalRipper> */}
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );
     return li;
    });

    return result;

    // var finalBlock = [];
    // if (codeBlock.length > 0) {
    //   finalBlock.push(
    //     <div>
    //       <h3 style={{ textAlign: "center" }}>
    //         These clips need to be trimmed
    //       </h3>
    //       {codeBlock}
    //     </div>
    //   );
    // }
    // return finalBlock;
  };

  const returnReadyHTML = () => {
    const items = readyToUpload();
    var codeBlock = [];
    for (let i = 0; i < items.length; i++) {
      let clip: any = items[i];
      codeBlock.push(
        <ListGroup.Item as="li">
          <Card>
            <Card.Body>
              <Card.Title>{clip.title}</Card.Title>
              {/* <Card.Text>{clip.contentSnippet}</Card.Text> */}
              <Card.Link href={clip.enclosure.url}>Submit Gem</Card.Link>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );
    }
    var finalBlock = [];
    if (codeBlock.length > 0) {
      finalBlock.push(
        <div>
          <h3 style={{ textAlign: "center" }}>Ready to upload</h3>
          {codeBlock}
        </div>
      );
    }
    return finalBlock;
  };

  const returnModal = (num: number) => {
    const items = audioClipsTooLong();
    let modalBlocks = [];
    for (let i = 0; i < items.length; i++) {
      let clip: any = items[i];
      modalBlocks.push(
        <AudioModalRipper
          show={isModalOpen}
          handleClose={handleClose}
          title={clip.title}
          url={clip.enclosure.url}
          id={i}
        ></AudioModalRipper>
      );
    }
    return modalBlocks[num];
  };

  return (
    <section className="container">
      <div className="rss-columns">
        <ListGroup id="readyToUpload" as="ul">
          {returnReadyHTML()}
        </ListGroup>
        <ListGroup id="needToBeTrimmed" as="ul">
          {returnHTML()}
        </ListGroup>
      </div>
    </section>
  );
};

export default RssFeed;
