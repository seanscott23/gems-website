import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
// import { useHistory } from "react-router-dom";
import { submitOrgName } from "../../store/actions/authActions";
import ProfilePhotoUpload from "../sections/ProfilePhotoUpload";
import { RootState } from "../../store";
import "../../styles/Profile.css";
import { Form } from "react-bootstrap";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Profile: FC = () => {
  // const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);
  const [newOrg, setNewOrg] = useState("");
  // const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const [rssFeed, setRssFeed] = useState("");
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setNewOrg(user?.orgName);
    }
  }, [user?.profilePhoto, user?.orgName]);

  const updateOrgName = (e: React.MouseEvent) => {
    dispatch(submitOrgName(newOrg));
    e.preventDefault();
    setSuccess("Organization name is updated!");
  };

  return (
    <section id="profile-container">
      <Form>
        <Form.Group>
          <div className="photoupload-div">
            <ProfilePhotoUpload></ProfilePhotoUpload>
          </div>
        </Form.Group>
        <br />
        <Form.Group>
          <h2>Organization Name:</h2>
          <div className="org-flex">
            <Input
              name="organizationName"
              id="profile-org"
              value={newOrg}
              onChange={(e) => setNewOrg(e.currentTarget.value)}
              placeholder="Organization Name"
              label=""
            />
            <Button
              text="Update"
              className="w-20 btn btn-primary"
              type="submit"
              // disabled={loading}
              onClick={(e) => updateOrgName(e)}
            />
          </div>
          {success !== "" ? (
            <div className="org-success">
              <Message type="success" msg={success} />{" "}
            </div>
          ) : null}
        </Form.Group>
      </Form>
    </section>
  );
};

export default Profile;
