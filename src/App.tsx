import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/sections/Header";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/Signin";
import Library from "./components/pages/Library";
import ForgotPassword from "./components/pages/ForgotPassword";
import Homepage from "./components/pages/Homepage";
import RssFeed from "./components/pages/RssFeed";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Loader from "./components/UI/Loader";
import firebase from "./firebase/config";

import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "./store/actions/authActions";
import { RootState } from "./store";

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  //check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification(true));
        } else {
          dispatch(setNeedVerification(false));
        }
      }
      dispatch(setLoading(false));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/rssFeed" component={RssFeed} exact />
        <PrivateRoute path="/library" component={Library} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
