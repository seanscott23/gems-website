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
  explicit: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      let gemArray = [];
      const gem = {
        audioURL,
        title,
        description,
        categories,
        explicit,
      } as FinalGem;
      gemArray.push(gem);
      dispatch({
        type: SET_FINAL_GEM,
        payload: gem,
      });
      dispatch({
        type: SET_USER_GEMS,
        payload: gemArray,
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
