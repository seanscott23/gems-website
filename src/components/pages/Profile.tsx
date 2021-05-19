import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { useHistory } from "react-router-dom";
import {
  setSuccess,
  submitGemForm,
  submitOrgName,
} from "../../store/actions/authActions";
import ProfilePhotoUpload from "../sections/ProfilePhotoUpload";
import { RootState } from "../../store";
import "../../styles/Profile.css";
import { Form } from "react-bootstrap";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Profile: FC = () => {
  const history = useHistory();
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );
  const [newOrg, setNewOrg] = useState("");
  const [error, setError] = useState("");

  const [rssFeed, setRssFeed] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [user?.profilePhoto]);

  const updateOrgName = () => {
    dispatch(submitOrgName(newOrg));
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
              value={user?.orgName}
              onChange={(e) => setNewOrg(e.currentTarget.value)}
              placeholder="Organization Name"
              label=""
            />
            <Button
              text="Update"
              className="w-20 btn btn-primary"
              type="submit"
              disabled={loading}
              onClick={updateOrgName}
            />
          </div>
        </Form.Group>
      </Form>
    </section>
  );
};

export default Profile;
