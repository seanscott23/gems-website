import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import App from "./App";
import "./firebase/config";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/index";
import firebase from "firebase";
import { getUserById } from "./store/actions/authActions";
import { User } from "./store/types";
import thunk from "redux-thunk";

document.addEventListener("DOMContentLoaded", async () => {
  let newStore;
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const currentUser = await firebase
        .database()
        .ref("users")
        .child(user.uid)
        .get();
      const userData = currentUser.val() as User;

      const preloadedState = {
        auth: {
          user: userData,
          userGems: [],
          authenticated: true,
          loading: false,
          error: "",
          needVerification: false,
          success: "",
          rssFeedUrl: {},
          gemURL: "",
          profilePhoto: "",
        },
      };

      newStore = store(preloadedState);
    } else {
      newStore = store();
    }
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={newStore}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
});
