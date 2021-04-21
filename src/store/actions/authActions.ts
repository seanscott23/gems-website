import { ThunkAction } from "redux-thunk";
import {
  SignUpData,
  // GemFormData,
  AuthAction,
  SET_USER,
  User,
  SET_LOADING,
  SIGN_OUT,
  SET_SIGNED_IN,
  SignInData,
  SET_ERROR,
  NEED_VERIFICATION,
  IS_VERIFIED,
  SET_SUCCESS,
  SET_FORM_SUCCESS,
  // GemFormData,
} from "../types";
import Parser from "rss-parser";
import fs from "fs";
import { RootState } from "..";
import firebase from "../../firebase/config";

import authReducer from "../reducers/authReducer";
const auth = firebase.auth();

export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          id: res.user.uid,
          createdAt: Date.now(),
        };
        console.log(userData);
        await firebase
          .database()
          .ref("/users")
          .child(res.user.uid)
          .set(userData);
        await res.user.sendEmailVerification();
        dispatch({
          type: NEED_VERIFICATION,
        });
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (err) {
      console.log(err);
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const user = await firebase.database().ref("users").child(id).get();
      if (user.exists()) {
        const userData = user.val() as User;
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          console.log(userCredential);
        });
    } catch (err) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
};

//logout
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
};

//trimming audioo

export const submitNewClip = (
  url: string,
  begin: number,
  end: number
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
};
// var options = {
//   mimeType: "audio/webm",
//   headers: new Headers({
//     "Content-Type": "audio/mpeg",
//     Accept: "application/json",
//   }),
// };

// let url =
//   "https://www.buzzsprout.com/1506739/8342249-wild-parrots-and-consciousness-with-mark-bittner.mp3?blob_id=37916052";
// const audio = new Audio(url + "#t=" + 10 + "," + 20);

// // audio.crossOrigin = "use-credentials";
// // navigator.mediaDevices
// //   .getUserMedia({ audio: true })
// //   .then((stream) => new MediaRecorder(stream, options))
// //   .then((result) => {
// //     console.log(result);
// //   });
// const ctx = new AudioContext();
// const stream_dest = ctx.createMediaStreamDestination();
// const source = ctx.createMediaElementSource(audio);
// source.connect(stream_dest);
// const stream = stream_dest.stream;
// let mediaRecorder = new MediaRecorder(stream, options);

// let chunks: any = [];
// var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

// var audioURL = URL.createObjectURL(blob);
// audio.src = audioURL;
// mediaRecorder.ondataavailable = (e) => {
//   chunks.push(e.data);
// };

// const mp3cutter = require("mp3-cutter");
// const getMyMp3Cut = (blob: Blob) => {
//   let cutter = new mp3cutter();

//   cutter.cut(blob, 0, 30, function (cuttedBlob: any) {
//     console.log("My blob has been cutted! ");
//     console.log(cuttedBlob);
//     return cuttedBlob;
//   });
// };

// let urlthing =
//   "https://www.buzzsprout.com/1506739/8342249-wild-parrots-and-consciousness-with-mark-bittner.mp3?blob_id=37916052";
// fetch(urlthing)
//   .then((response) => response.blob())
//   .then((result) => console.log(getMyMp3Cut(result)));

//  const audioContext = new AudioContext();
//       fetch(
//         "https://www.buzzsprout.com/1506739/8342249-wild-parrots-and-consciousness-with-mark-bittner.mp3?blob_id=37916052",
//         {
//           method: "GET",
//           // mode: "no-cors",
//           headers: new Headers({
//             "Content-Type": "audio/mpeg",
//             Accept: "application/json",
//           }),
//         }
//       ).then((data) => {
//         let result = data.clone().json();
//         console.log(result);
//         // const blob = new Blob([response.data], {
//         //   type: "application/mp3",
//         // });
//       });
//       // .then((result) => {
//       //   console.log(result);
//       //   console.log(audioContext);

//       //   // audioContext.decodeAudioData(arrayBuffer);
//       // });
//       // .then((decodedAudio) => {
//       //   audio = decodedAudio;
//       //   console.log(audio);
//       // });

//dashboard form
export const submitGemForm = (
  data: string,
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const RssParser = new Parser();
      const feed = await RssParser.parseURL(data);
      dispatch({
        type: SET_FORM_SUCCESS,
        payload: feed,
      });
      dispatch(setSuccess(successMsg));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

// set need verification

export const setNeedVerification = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    if (value === true) {
      dispatch({
        type: NEED_VERIFICATION,
        payload: value,
      });
    }
    if (value === false) {
      dispatch({
        type: IS_VERIFIED,
        payload: value,
      });
    }
  };
};

//set success

export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    });
  };
};

//send password reset email

export const sendPasswordResetEmail = (
  email: string,
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(setSuccess(successMsg));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};
