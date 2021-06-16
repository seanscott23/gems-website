import { ThunkAction } from "redux-thunk";
import { AuthAction, SET_ERROR, SET_USER_GEMS } from "../types";
import { RootState } from "..";
import firebase from "../../firebase/config";
const auth = firebase.auth();

//submit final gem with form
export const submitFinalGem = (
  audioURL: string,
  title: string,
  description: string,
  categories: Array<any>,
  explicit: boolean,
  gemID: string,
  duration: number
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      fetch("https://floating-retreat-09098.herokuapp.com/api/post/gems", {
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
          duration: duration,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(getUserGems());
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
      await fetch("https://floating-retreat-09098.herokuapp.com/api/get/gems/", {
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
      
          let newData = data.reverse();

          dispatch({
            type: SET_USER_GEMS,
            payload: newData,
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
  duration: string,
  title: string,
  description: string,
  categories: Array<any>,
  explicit: boolean,
  gemID: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await fetch("https://floating-retreat-09098.herokuapp.com/api/update/gem/", {
        method: "PUT",
        body: JSON.stringify({
          ownerID: await auth.currentUser?.uid,
          token: await auth.currentUser?.getIdToken(),
          gemID: gemID,
          duration: duration,
          audioURL: audioURL,
          title: title,
          description: description,
          categories: categories,
          explicit: explicit,
        }),
      });

      // let currentGem = [
      //   gemID,
      //   {
      //     audioURL: audioURL,
      //     categories: categories,
      //     description: description,
      //     duration: duration,
      //     explicit: explicit,
      //     title: title,
      //   },
      // ];
      // let storedGems: any[] = [];
      // let newURL = localStorage.getItem("userGems");
      // storedGems = newURL ? JSON.parse(newURL) : [];
      // localStorage.clear();

      // storedGems.forEach((tempGem) => {
      //   if (tempGem[0] === gemID) {
      //     tempGem = currentGem;
      //     return;
      //   }
      // });
      // window.localStorage.setItem("userGems", JSON.stringify(storedGems));
      // getUserGems();
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
      await fetch("https://floating-retreat-09098.herokuapp.com/api/remove/gem/", {
        method: "DELETE",
        body: JSON.stringify({
          token: await auth.currentUser?.getIdToken(),
          gemID: gemID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let storedGems: any[] = [];
          let newURL = localStorage.getItem("userGems");
          storedGems = newURL ? JSON.parse(newURL) : [];
          if (storedGems.length === 1) {
            localStorage.clear();
          } else {
            getUserGems();
          }
        });
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};
