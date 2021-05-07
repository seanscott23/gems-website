import { FC, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../UI/Message";
import { useHistory } from "react-router-dom";
import { setSuccess, submitGemForm } from "../../store/actions/authActions";
import ProfilePhotoUpload from "../sections/ProfilePhotoUpload";
import { RootState } from "../../store";
import { Form } from "react-bootstrap";
import Button from "../UI/Button";

const Profile: FC = () => {
  const history = useHistory();
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );
  const [error, setError] = useState("");

  const [rssFeed, setRssFeed] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [user?.profilePhoto]);

  return (
    <section id="container">
      <div>
        <ProfilePhotoUpload></ProfilePhotoUpload>
      </div>
    </section>
  );
};

export default Profile;
