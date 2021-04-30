import { ThunkAction } from "redux-thunk";
import {
  AuthAction,
  SET_ERROR,
  FinalGem,
  SET_FINAL_GEM,
  SET_USER_GEMS,
} from "../types";
import { RootState } from "..";
import firebase from "../../firebase/config";
import admin from "firebase-admin";
import Parser from "rss-parser";
import fs from "fs";
import authReducer from "../reducers/authReducer";
const auth = firebase.auth();

//submit final gem with form
export const submitFinalGem = (
  audioURL: string,
  title: string,
  description: string,
  categories: Array<any>,
  explicit: boolean,
  gemID: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      fetch("http://localhost:8000/api/post/gems", {
        method: "POST",
        body: JSON.stringify({
          ownerID: auth.currentUser?.uid,
          token: await auth.currentUser?.getIdToken(),
          gemID: gemID,
          audioURL: audioURL,
          title: title,
          description: description,
          categories: categories,
          explicit: explicit,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // dispatch({
          //   type: "SET_NEW_GEM",
          //   payload: data
          // })
        });
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

export const getUserGems = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return async (dispatch) => {
    try {
      await fetch("http://localhost:8000/api/get/gems/", {
        method: "POST",
        body: JSON.stringify({
          ownerID: auth.currentUser?.uid,
          token: await auth.currentUser?.getIdToken(),
          gemID: "",
          audioURL: "",
          title: "",
          description: "",
          categories: [],
          explicit: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: SET_USER_GEMS,
            payload: data,
          });
        });
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

export const updateGemAction = (
  audioURL: string,
  title: string,
  description: string,
  categories: Array<any>,
  explicit: boolean,
  gemID: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await fetch("http://localhost:8000/api/update/gem/", {
        method: "PUT",
        body: JSON.stringify({
          ownerID: auth.currentUser?.uid,
          token: await auth.currentUser?.getIdToken(),
          gemID: gemID,
          audioURL: audioURL,
          title: title,
          description: description,
          categories: categories,
          explicit: explicit,
        }),
      });
      // .then((response) => response.json())
      // .then((data) => {

      // });
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

export const deleteGemAction = (
  gemID: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await fetch("http://localhost:8000/api/remove/gem/", {
        method: "DELETE",
        body: JSON.stringify({
          token: await auth.currentUser?.getIdToken(),
          gemID: gemID,
        }),
      });
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};
