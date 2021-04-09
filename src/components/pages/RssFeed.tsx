import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Card, ListGroup } from "react-bootstrap";
import "../../styles/RssFeed.css";

const RssFeed: FC = () => {
  const { rssFeedUrl, success } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
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
    var codeBlock = [<div />];
    for (let i = 0; i < items.length; i++) {
      let clip: any = items[i];
      codeBlock.push(
        <ListGroup.Item as="li">
          <Card>
            <Card.Body>
              <Card.Title>{clip.title}</Card.Title>
              {/* <Card.Text>{clip.contentSnippet}</Card.Text> */}
              <Card.Link href={clip.enclosure.url}>Trim audio</Card.Link>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );
    }

    var finalBlock = [<div />];
    if (codeBlock.length > 1) {
      finalBlock.push(
        <div>
          <h3 style={{ textAlign: "center" }}>
            These clips need to be trimmed
          </h3>
          {codeBlock}
        </div>
      );
    }
    return finalBlock;
  };

  const returnReadyHTML = () => {
    const items = readyToUpload();
    var codeBlock = [<div />];
    for (let i = 0; i < items.length; i++) {
      let clip: any = items[i];
      codeBlock.push(
        <ListGroup.Item as="li">
          <Card>
            <Card.Body>
              <Card.Title>{clip.title}</Card.Title>
              {/* <Card.Text>{clip.contentSnippet}</Card.Text> */}
              <Card.Link href={clip.enclosure.url}>Trim audio</Card.Link>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );
    }
    var finalBlock = [<div />];
    if (codeBlock.length > 1) {
      debugger;
      finalBlock.push(
        <div>
          <h3 style={{ textAlign: "center" }}>Ready to upload</h3>
          {codeBlock}
        </div>
      );
    }
    return finalBlock;
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
