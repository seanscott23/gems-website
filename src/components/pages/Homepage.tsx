import React, { FC } from "react";

const Homepage: FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className=".title has-text-centered is-size-1 mb-6">
          Welcome to Gems!
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
          can share with the world.
        </p>
      </div>
    </section>
  );
};

export default Homepage;
