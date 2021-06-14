import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import { signup, setError } from "../../store/actions/authActions";
import { Form, Card } from "react-bootstrap";
import { RootState } from "../../store";
import "../../styles/Signup.css";
import { Link } from "react-router-dom";
// import ProfilePhotoUpload from "../sections/ProfilePhotoUpload";
import PasswordToggle from "../hooks/PasswordToggle";

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [password, setPassword] = useState("");
  // const [profileImage, setProfileImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
  let [passwordInputType, toggleIcon] = PasswordToggle();

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const updatePhoto = (e: React.ChangeEvent) => {
    let fReader = new FileReader();
    let target: any = e.target;
    // let result = fReader.readAsDataURL(target.files[0]);
    let fileEvent = target.files[0];

    fReader.onload = function (e) {
      console.log(e.target?.result);
      if (
        e.target?.result !== undefined &&
        typeof e.target?.result === "string"
      ) {
        // setProfilePhoto(e.target?.result);
        setProfilePhoto(fileEvent);
      }
    };
    fReader.readAsDataURL(fileEvent);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      signup({ email, password, firstName, orgName, profilePhoto }, () =>
        setLoading(false)
      )
    );
  };

  return (
    <div>
      <Card className="sign-up-container">
        {/* <div className="container"> */}
        <h2 className="has-tex-centered is-size-2 mb-3">Sign Up</h2>
        <Form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Form.Group>
            <Input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              placeholder="First name"
              label=""
            />
          </Form.Group>
          <Form.Group>
            <Input
              name="organizationName"
              value={orgName}
              onChange={(e) => setOrgName(e.currentTarget.value)}
              placeholder="Organization Name"
              label=""
            />
          </Form.Group>
          <Form.Group>
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Email address"
              label=""
            />
          </Form.Group>
          <Form.Group>
            <Input
              name="password"
              value={password}
              type={
                typeof passwordInputType === "string"
                  ? passwordInputType
                  : "password"
              }
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
              label=""
            />
            <span className="up-eye-icon">{toggleIcon}</span>
          </Form.Group>
          <Form.Group>
            <Form.File
              onChange={(e: React.ChangeEvent) => updatePhoto(e)}
              accept=".jpg,.png"
              id="exampleFormControlFile1"
              label="Profile image(optional)"
            />
            <div className="signup-photo"></div>
          </Form.Group>
          <Button
            text={loading ? "Loading..." : "Sign Up"}
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
          />
        </Form>
        {/* </div> */}
      </Card>
      <div className="homeLink-signup">
        <span>Already have an account?</span>{" "}
        <Link to={"/signin"}>Sign in</Link>
      </div>
    </div>
  );
};

export default SignUp;
