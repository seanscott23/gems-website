import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import { signin } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { Form, Card, Container } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordToggle from "../hooks/PasswordToggle";
import "../../styles/Signin.css";

const Signin: FC = () => {
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let [passwordInputType, toggleIcon] = PasswordToggle();

  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // return () => {
    //   if (error) {
    //     dispatch(setError(""));
    //   }
    // };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signin({ email, password }, () => setLoading(false)));
    setLoading(false);
  };

  return (
    <Container>
      <Card className="sign-in-container">
        <h2 className="text-center">Sign In</h2>
        <Form onSubmit={submitHandler}>
          <div>
            <Form.Group controlId="formBasicEmail">
              {error && <Message type="danger" msg={error} />}
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Email address"
                label=""
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Input
                name="password"
                value={password}
                type={
                  typeof passwordInputType === "string"
                    ? passwordInputType
                    : "password"
                }
                label=""
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Password"
              />

              <span className="in-eye-icon">{toggleIcon}</span>
            </Form.Group>
            <p>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>
          <Button
            text={loading ? "Loading..." : "Sign In"}
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
          ></Button>
        </Form>
      </Card>
      <div className="homeLink">
        <span>New to Karats?</span> <Link to={"/signup"}>Sign up</Link>
      </div>
    </Container>
  );
};

export default Signin;
