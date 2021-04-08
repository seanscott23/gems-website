import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { setSuccess, submitGemForm } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Card, Form, ListGroup, Table } from "react-bootstrap";
import Button from "../UI/Button";
import Parser from "rss-parser";
import fs from "fs";
import "../../styles/RssFeed.css";

const RssFeed: FC = (data) => {
  const { success, feedUrl } = useSelector((state: RootState) => state.auth);

  const [rssFeed, setRssFeed] = useState("");
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
  // const items = feed.items;

  // const readyToUpload: Array<object> = [];
  // const needsToBeTrimmed: Array<object> = [];
  // const sortedItems = [...readyToUpload, ...needsToBeTrimmed];
  // items.map(async (currentItem) => {
  //   if (currentItem.itunes.duration < 600) {
  //     readyToUpload.push(currentItem);
  //   } else if (currentItem.itunes.duration >= 600) {
  //     needsToBeTrimmed.push(currentItem);
  //   }

  const checkConsole = () => {
    console.log(feedUrl);
  };

  return (
    <section className="container">
      <div className="rss-columns">
        <ListGroup id="needToBeTrimmed" as="ul">
          <h3 style={{ textAlign: "center" }}>Needs to be trimmed</h3>
          <ListGroup.Item as="li">
            <Card>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Link onClick={checkConsole}>Card Link</Card.Link>
              </Card.Body>
            </Card>
          </ListGroup.Item>
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
