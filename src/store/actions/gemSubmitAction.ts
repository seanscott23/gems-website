import { ThunkAction } from "redux-thunk";
import { AuthAction, SET_ERROR, FinalGem, SET_FINAL_GEM } from "../types";
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
  categories: Array<string>,
  explicit: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const gem = {
        audioURL,
        title,
        description,
        categories,
        explicit,
      } as FinalGem;
      dispatch({
        type: SET_FINAL_GEM,
        payload: gem,
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
