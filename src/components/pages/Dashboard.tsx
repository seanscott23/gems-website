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
  const { user, needVerification, success, error } = useSelector(
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
    if (rssFeed.length > 0) {
      e.preventDefault();
      setLoading(true);
      dispatch(submitGemForm({ rssFeed }, () => setLoading(false)));
    }
  };
  const isValidRssFeed = () => {
    if (rssFeed.slice(0, 8) === "https://") {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
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
          text={loading ? "Loading..." : "Upload Gem"}
          className="w-100 btn btn-primary"
          type="submit"
          onClick={() =>
            isValidRssFeed() ? (
              history.push("/rssFeed")
            ) : (
              <div>
                <Alert variant="danger">Please enter a valid RSS Feed</Alert>
                <Message type="danger" msg={error} />
              </div>
            )
          }
          disabled={loading}
        ></Button>
      </Form>
    </section>
  );
};

export default Dashboard;
