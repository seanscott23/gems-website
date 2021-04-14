import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { useHistory, Link } from "react-router-dom";
import { setSuccess, submitGemForm } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Alert, Form, FormControl } from "react-bootstrap";
import Button from "../UI/Button";
import AudioUpload from "../sections/AudioUpload";

const Dashboard: FC = () => {
  const history = useHistory();
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );

  const [rssFeed, setRssFeed] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (success) {
        dispatch(setSuccess(""));
      }
    };
  }, [dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (rssFeed.slice(0, 8) === "https://") {
      setLoading(true);
      await dispatch(submitGemForm(rssFeed, "Success"));
      setLoading(false);
      history.push("/rssFeed");
    }
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

        <AudioUpload></AudioUpload>
        <Button
          text={loading ? "Loading..." : "Upload Rss Feed"}
          className="w-100 btn btn-primary"
          type="submit"
          disabled={loading}
        ></Button>
      </Form>
    </section>
  );
};

export default Dashboard;
