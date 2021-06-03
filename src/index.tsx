import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD:src/index.tsx
import { Provider, useDispatch } from "react-redux";
=======
import { Provider } from "react-redux";
>>>>>>> 1d5ca6a5f78423a64970872d783f21f4f4abd128:index.tsx
import App from "./App";
import "./firebase/config";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/index";
import firebase from "firebase";
<<<<<<< HEAD:src/index.tsx
import { getUserById } from "./store/actions/authActions";
import { User } from "./store/types";
import thunk from "redux-thunk";
=======

import { User } from "./store/types";
>>>>>>> 1d5ca6a5f78423a64970872d783f21f4f4abd128:index.tsx

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
          // profilePhoto: "",
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
