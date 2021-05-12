import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./firebase/config";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/index";
import firebase from "firebase";

document.addEventListener("DOMContentLoaded", () => {
  const auth = firebase.auth();
  let newStore;
  if (auth.currentUser) {
    const preloadedState = {
      auth: {
        user: { [auth.currentUser.uid]: auth.currentUser },
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
