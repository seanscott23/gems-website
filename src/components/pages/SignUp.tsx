import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import { signup, setError } from "../../store/actions/authActions";
import { Form, Card } from "react-bootstrap";
import { RootState } from "../../store";

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  };

  return (
    <Card className="section">
      <div className="container">
        <h2 className="has-tex-centered is-size-2 mb-3">Sign Up</h2>
        <Form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="First name"
            label="First name"
          />
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
            label="Password"
          />
          <Button
            text={loading ? "Loading..." : "Sign Up"}
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
          />
        </Form>
      </div>
    </Card>
  );
};

export default SignUp;
