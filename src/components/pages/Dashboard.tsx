import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { setSuccess, submitGemForm } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Form } from "react-bootstrap";
import Button from "../UI/Button";

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );

  const [rssFeed, setRssFeed] = useState("");
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
    dispatch(submitGemForm({ rssFeed }, () => setLoading(false)));
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
