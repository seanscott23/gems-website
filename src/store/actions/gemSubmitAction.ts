import { ThunkAction } from "redux-thunk";
import { AuthAction, CLIP_AUDIO, SET_ERROR, SET_FORM_SUCCESS } from "../types";
import { RootState } from "..";
import firebase from "../../firebase/config";
import admin from "firebase-admin";
import Parser from "rss-parser";
import fs from "fs";
import authReducer from "../reducers/authReducer";
const auth = firebase.auth();

//submit final gem with form
export const submitFinalGem = (
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
