import { ThunkAction } from "redux-thunk";
import {
  SignUpData,
  GemFormData,
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
} from "../types";
import Parser from "rss-parser";
import fs from "fs";
import { RootState } from "..";
import firebase from "../../firebase/config";

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
        // userSessionRef.update({createdAt: firebase.database.ServerValue.TIMESTAMP})
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
      // firebase.database().goOnline();
      if (user.exists()) {
        const userData = user.val() as User;
        // console.log(userData);
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

//dashboard form
export const submitGemForm = (
  data: GemFormData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      if (data.rssFeed.slice(0, 8) === "https://") {
        // const isEquivalent = (a: string, b: string) => {
        //   // Create arrays of property names
        //   let aProps = Object.getOwnPropertyNames(a);
        //   let bProps = Object.getOwnPropertyNames(b);
        //   if (aProps.length !== bProps.length) {
        //     return false;
        //   }

        //   for (let i = 0; i < aProps.length; i++) {
        //     let propName = aProps[i];

        //     if (a[propName] !== b[propName]) {
        //       return false;
        //     }
        //   }
        //   return true;
        // };
        const ex = "https://feeds.buzzsprout.com/1506739.rss";
        const RssParser = new Parser();
        const feed = await RssParser.parseURL(data?.rssFeed);
        console.log(feed);
        const items = feed.items;
        const readyToUpload: Array<object> = [];
        const needsToBeTrimmed: Array<object> = [];
        items.map(async (currentItem) => {
          if (currentItem.itunes.duration < 600) {
            readyToUpload.push(currentItem);
          } else if (currentItem.itunes.duration >= 600) {
            needsToBeTrimmed.push(currentItem);
          }
        });

        // let items: Array<string> = [];
        // const fileName = `${feed?.title}`;
        // const filenameReplacement = fileName
        //   .replace(/\s+/g, "-")
        //   .replace(/[/\\?%*:|"<>]/g, "")
        //   .toLowerCase();
        // if (fs.existsSync(filenameReplacement)) {
        //   items = require(`./${filenameReplacement}`);
        // }
        // await Promise.all(
        //   feed.items.map(async (currentItem) => {
        //     if (
        //       items.filter((item) => isEquivalent(item, currentItem)).length <=
        //       0
        //     ) {
        //       items.push(currentItem);
        //     }
        //   })
        // );
        // fs.writeFileSync(fileName, JSON.stringify(items));
      }
      dispatch({
        type: SET_FORM_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      onError();
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
