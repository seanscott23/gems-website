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
      if (parseInt(currentItem.itunes.duration) >= 600) {
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
              <Card.Link>Trim audio</Card.Link>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );
    }
    return codeBlock;
  };

  const table = returnHTML();
  return (
    <section className="container">
      <div className="rss-columns">
        <ListGroup id="needToBeTrimmed" as="ul">
          <h3 style={{ textAlign: "center" }}>Needs to be trimmed</h3>
          {table}
        </ListGroup>
        <ListGroup id="readyToUpload" as="ul">
          <h3 style={{ textAlign: "center" }}>Ready to upload</h3>
          <ListGroup.Item as="li">
            <Card>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </section>
  );
};

export default RssFeed;
