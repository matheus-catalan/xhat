import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBxXfvIhthwUN_cy7isq_jHAq1kCJFJiBA",
  authDomain: "xhat-3a428.firebaseapp.com",
  databaseURL: "https://xhat-3a428.firebaseio.com/",
  projectId: "xhat-3a428",
  storageBucket: "xhat-3a428.appspot.com",
  messagingSenderId: "861201349680",
  appId: "1:861201349680:web:0d47eb1b3d77dcb95d81f5",
  measurementId: "G-EKYLNFVK1L",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();