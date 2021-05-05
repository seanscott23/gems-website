import { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { useHistory } from "react-router-dom";
import { setSuccess, submitGemForm } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Form } from "react-bootstrap";
import Button from "../UI/Button";
import AudioUpload from "../sections/AudioUpload";
import "../../styles/Dashboard.css";

const Dashboard: FC = () => {
  const history = useHistory();
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );
  const [error, setError] = useState("");

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
  debugger;
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (rssFeed.slice(0, 8) === "https://") {
      setLoading(true);
      await dispatch(submitGemForm(rssFeed, "Success"));
      setLoading(false);
      history.push("/rssFeed");
    } else {
      setError("Please provide a valid RSS Feed URL");
    }
  };
  const getName = () => {
    if (user) {
      let chars = user.firstName.split("");
      let first = chars[0].toUpperCase();
      chars.shift();
      let name = first + chars.join("");
      return name;
    }
  };

  return (
    <section id="container">
      <div>
        {needVerification && (
          <Message type="success" msg="Please verify your email address." />
        )}
        <h1 className="is-size-1 dash-name">Welcome {getName()}</h1>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Trim or upload your audio from your RSS Feed:</Form.Label>
          <Form.Control
            name="rssFeed"
            value={rssFeed}
            onChange={(e) => setRssFeed(e.currentTarget.value)}
            placeholder="Example: https://feeds.buzzsprout.com/5106442.rss"
            type="url"
          />
        </Form.Group>
        <p className="Rss-error">{error}</p>
        <Button
          text={loading ? "Loading..." : "Upload Rss Feed"}
          className="w-100 btn btn-primary"
          type="submit"
          disabled={loading}
        ></Button>

        <Form.Label className="dashboard-p">
          OR upload clips individually from you computer:
        </Form.Label>

        <AudioUpload></AudioUpload>
      </Form>
    </section>
  );
};

export default Dashboard;
