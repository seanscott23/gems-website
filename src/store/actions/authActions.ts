import { User } from './../types';
import { ThunkAction } from "redux-thunk";
import {
  SignUpData,
  AuthAction,
  SET_USER,
  SET_LOADING,
  SIGN_OUT,
  SignInData,
  SET_ERROR,
  NEED_VERIFICATION,
  IS_VERIFIED,
  SET_SUCCESS,
  SET_FORM_SUCCESS,
  CLIP_AUDIO,
  SET_USER_PHOTO,
} from "../types";
import Parser from "rss-parser";
import { RootState } from "..";
import firebase from "../../firebase/config";
import { FC } from "react";
import { userInfo } from "node:os";

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
          gems: [],
          profilePhoto: data.profilePhoto 
        };
        await firebase
          .database()
          .ref("/users")
          .child(res.user.uid)
          .set(userData);
        res.user.sendEmailVerification().then(() => {
          //useState used on my loading (user can cancel this loading and exit               this task
          dispatch(
            setError("Please check your email to verify your email address")
          );
          // const unsubscribeOnUserChanged = firebase
          //   .auth()
          //   .onAuthStateChanged((response) => {
          //     const unsubscribeSetInterval = setInterval(() => {
          //       //this works as a next in for-like
          //       firebase.auth().currentUser?.reload();
          //     }, 30000);
          //     if (response?.emailVerified) {
          //       clearInterval(unsubscribeSetInterval); //stop setInterval
          //       setLoading(false); //close loading describes above
          //       dispatch(setError("This user exists, please sign in"));
          //       return unsubscribeOnUserChanged(); //unsubscribe onUserChanged
          //     }
          //   });
        });
        // if (!res.user.emailVerified) {
        //   debugger;
        //   dispatch(
        //     setError("Please check your email to verify your email addess")
        //   );
        // }
        // dispatch({
        //   type: NEED_VERIFICATION,
        // });
        // dispatch({
        //   type: SET_USER,
        //   payload: userData,
        // });
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

const  uploadUserImage = async (image:File) => {
  console.log(image)
  let formData = new FormData()
  formData.append("user_image", image)
  formData.append("user_id", auth.currentUser?.uid as string)
  formData.append("token", await auth.currentUser?.getIdToken() as string)

  // fetch("http://localhost:8000/api/deliver/userImage/",{
  //   method: "POST",
  //   body: formData
  // })
  // .then((response) => response.json())
  // .then((data) => {
  //   console.log(data)
  // });
  return ""
} 

export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const user = await firebase.database().ref("users").child(id).get();
      console.log("Does this user exist", user.exists())
      if (user.exists()) {
        const userData = user.val() as User;
        console.log("Hiiii im the users data ", userData)
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      } else {
        dispatch({
          type: SET_USER,
          payload: user.val() as User,
        });
      }
      else{
        console.log(user.val() as User)
        dispatch({
          type: SET_USER,
          payload: user.val() as User
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
          console.log(userCredential)
          if (!userCredential.user?.emailVerified) {
            userCredential.user?.reload();
            dispatch(setError("Please verify your email address"));
            dispatch(setLoading(false));
            dispatch({
              type: NEED_VERIFICATION,
            });
          } else {
            console.log(userCredential);

            // dispatch({
            //   type: SET_USER,
            //   payload: userCredential.user.email,
            // });
          }
        });
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     if (!user.emailVerified) {
      //       dispatch({
      //         type: NEED_VERIFICATION,
      //       });
      //       dispatch(setError("Please verify your email address"));
      //     } else {
      //       console.log("success");
      //     }
      //   } else {
      //     dispatch(
      //       setError(
      //         "This email password combination may not work or the user doesn't exist"
      //       )
      //     );
      //   }
      // });
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

//trimming audio
export const submitNewClip = (
  url: string,
  begin: number,
  end: number
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await fetch("http://localhost:8000/api/deliver/audio/", {
        method: "POST",
        // mode: 'no-cors',
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
        body: JSON.stringify({
          userID: auth.currentUser?.uid,
          token: await auth?.currentUser?.getIdToken(),
          url: url,
          begin: begin * 60,
          end: end * 60,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let url = data.trimmed_audio_url;
          console.log(data);
          dispatch({
            type: CLIP_AUDIO,
            payload: url,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

//trimming file audio
export const submitNewFile = (
  file: string,
  begin: number,
  end: number
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    let encodedString = file.replace("data:audio/mpeg;base64,", "");
    // let base64 = file.split(",")[1];
    const formData = new FormData();
    const b64toBlob = (file: string) => {
      var byteString = atob(file.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    };
    // await fetch(file, {
    //   credentials: "same-origin",
    //   method: "POST",
    //   headers: new Headers({
    //     "Content-Type": "text/plain",
    //     Accept: "text/plain",
    //     "Access-Control-Allow-Origin": "*",
    //   }),
    // })
    let blob = b64toBlob(file);
    // .then((res) => res.blob())
    // .then((blob) => {
    let beginInt = begin * 60;
    let endInt = end * 60;
    const mp3file = new File([blob], "simonsays", { type: "audio/*" });
    formData.append("file", mp3file);
    // });

    formData.append("userID", auth.currentUser?.uid as string);
    formData.append("token", (await auth?.currentUser?.getIdToken()) as string);
    formData.append("begin", beginInt.toString());
    formData.append("end", endInt.toString());

    try {
      await fetch("http://localhost:8000/api/deliver/mp3/audio/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          let url = data.trimmed_audio_url;
          console.log(data);
          dispatch({
            type: CLIP_AUDIO,
            payload: url,
          });
        });
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

export const submitPhoto = (
  photoUrl: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_USER_PHOTO,
        payload: photoUrl,
      });
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

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
