import React, { FC } from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Button from "../UI/Button";
import "../../styles/Homepage.css";

const Homepage: FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const clickHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerHTML === "Sign in") {
      e.preventDefault();
      setLoading(true);
      history.push("/signin");
      setLoading(true);
    } else {
      e.preventDefault();
      setLoading(true);
      history.push("/signup");
      setLoading(true);
    }
  };

  return (
    <section className="section">
      <div className="home-container">
        <h1 className=".title has-text-centered is-size-1 mb-6">
          Welcome to Karats!
        </h1>
        <p>
          The new platform for audio content creators.
          <br />
          <br />
          Quickly upload short audio clips or trim existing podcast or audio
          files to below 10 min for everyone to listen to.
          <br />
          <br />
          We created this platform for two reasons. The first was to provide
          podcasters with a unique and effective way to advertise their podcast
          highlights to gain new users. The second was to provide new and
          existing creators with a platform exclusivly for focused material they
          can share with the world. That's why we chose the name 'Karats', we
          like to call any clips that you upload 'gems' and as you upload more,
          the value "(karats)" of your organization grows
        </p>
        <div className="homepage-buttons">
          <Button
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
            text="Sign in"
            onClick={(e) => clickHandler(e)}
          ></Button>
          <Button
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
            text="Sign up"
            onClick={(e) => clickHandler(e)}
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
