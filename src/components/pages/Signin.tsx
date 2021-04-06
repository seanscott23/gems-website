import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import { signin, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { Form, Card } from "react-bootstrap";

const Signin: FC = () => {
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
    dispatch(signin({ email, password }, () => setLoading(false)));
  };

  return (
    <Card className="section">
      <div className="container">
        <h2 className="text-center">Sign In</h2>
        <Form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            {error && <Message type="danger" msg={error} />}
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
              type="passowrd"
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
              label="Password"
            />
            <p>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>
          <Button
            text={loading ? "Loading..." : "Sign In"}
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
          />
        </Form>
      </div>
    </Card>
  );
};

export default Signin;
