import firebase from "firebase/app";
var admin = require("firebase-admin");
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_DEPLOYED_HOST_SERVER}/users/login`
    : `${process.env.NEXT_PUBLIC_LOCAL_HOST_SERVER}/users/login`;

const createToken = async () => {
  const user = firebase.auth().currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export const login = async (userData) => {
  const header = await createToken();
  try {
    await admin
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((userCredential) => {
        console.log(userCredential);
      });
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (userData) => {
  const header = await createToken();
  try {
    const res = await axios.post(url, userData, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
