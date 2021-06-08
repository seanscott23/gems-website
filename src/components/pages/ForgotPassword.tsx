import { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import {
  sendPasswordResetEmail,
  setError,
  setSuccess,
} from "../../store/actions/authActions";
import { RootState } from "../../store";
import "../../styles/ForgotPassword.css";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
      if (success) {
        dispatch(setSuccess(""));
      }
    };
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, "Email sent!"));
    setLoading(false);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-tex-centered is-size-2 mb-3 reset">
          Reset Password
        </h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          {success && <Message type="success" msg={success} />}
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Button
            text={loading ? "Loading..." : "Send password reset email"}
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
          ></Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
