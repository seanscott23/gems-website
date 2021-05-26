import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import { signin, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Link, useHistory } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import "../../styles/Contact.css";

const Contact: FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { error, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {}, [error, dispatch]);

  return (
    <div>
      <div className="Contact-container">
        <h2 className="text-center">Contact</h2>
        <br />
        <p>
          Please contact us at [INSERT_KARATS_EMAIL_HERE] if you have any
          questions or concerns.
        </p>
        <p>
          If you have a traidmark claim, please provide all neccesary
          information in the email and we will take all content associated with
          the trademark.
        </p>
      </div>
      <div className="homeLink">
        <span>New to Karats?</span> <Link to={"/signup"}>Sign up</Link>
      </div>
      <p className="contact-or">Or</p>
      <div className="contact-signin">
        <span>Have an account?</span> <Link to={"/signin"}>Sign in</Link>
      </div>
    </div>
  );
};

export default Contact;
