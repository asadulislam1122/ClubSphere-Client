import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
const GoogleProvider = new GoogleAuthProvider();
const AuthProvaider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // user R

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   forget pass
  const forgotPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  // gogle
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };
  // signOut
  const signOute = () => {
    setLoading(true);
    return signOut(auth);
  };
  // update Profie
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  // obsarv user State
  useEffect(() => {
    const unsubScribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubScribe();
    };
  }, []);
  const authInfo = {
    registerUser,
    signInUser,
    forgotPassword,
    signInGoogle,
    user,
    loading,
    signOute,
    updateUserProfile,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvaider;
