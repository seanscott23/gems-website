import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { setSuccess, submitGemForm } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Form } from "react-bootstrap";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );

  const [rssFeed, setRssFeed] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      submitGemForm({ rssFeed, title, description }, () => setLoading(false))
    );
  };

  return (
    <section className="container">
      <div>
        {needVerification && (
          <Message type="success" msg="Please verify your email address." />
        )}
        <h1 className="is-size-1">Welcome {user?.firstName}</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>RSS Feed</Form.Label>
          <Form.Control
            name="rssFeed"
            value={rssFeed}
            onChange={(e) => setRssFeed(e.currentTarget.value)}
            placeholder="Example: https://feeds.buzzsprout.com/5106442.rss"
            type="url"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Description"
            rows={5}
          />
        </Form.Group>
        <Button
          text={loading ? "Loading..." : "Upload Gem"}
          className="w-100 btn btn-primary"
          type="submit"
          disabled={loading}
        ></Button>
      </Form>
    </section>
  );
};

export default Dashboard;
