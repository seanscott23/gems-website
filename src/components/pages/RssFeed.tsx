import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../../styles/RssFeed.css";
import ReturnHTML from "../rss/ReturnHtml";

const RssFeed: FC = () => {
  const { rssFeedUrl, success } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalState] = useState(false);

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

  return (
    <section className="container">
      <div className="rss-columns">
        <ListGroup id="readyToUpload" as="ul">
          {returnReadyHTML()}
        </ListGroup>
        <ListGroup id="needToBeTrimmed" as="ul">
          {ReturnHTML()}
        </ListGroup>
      </div>
    </section>
  );
};

export default RssFeed;
