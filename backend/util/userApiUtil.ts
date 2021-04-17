import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import axios from "axios";

const url = "http://localhost:3001/api";

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

export const addUser = async (name, email) => {
  const header = await createToken();
  const payload = {
    name,
    email,
  };
  try {
    const res = await axios.post(url, payload, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getEmailEntries = async () => {
  const header = await createToken();
  try {
    const res = await axios.get(url, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};


