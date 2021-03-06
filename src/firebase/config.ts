import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE__AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
//   projectId: process.env.REACT_APP_FIREBASE__PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE__STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// });

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY_TEST,
  authDomain: process.env.REACT_APP_FIREBASE__AUTH_DOMAIN_TEST,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL_TEST,
  projectId: process.env.REACT_APP_FIREBASE__PROJECT_ID_TEST,
  storageBucket: process.env.REACT_APP_FIREBASE__STORAGE_BUCKET_TEST,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_TEST,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_TEST,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_TEST,
});

// db.settings({ timestampInSnapshots: true });
export default firebase;
