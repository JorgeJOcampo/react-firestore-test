import firebase from "firebase/app";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyDD3qP7ODctew385D-2dM3GHn0GaKeq2hA",
  authDomain: "todos-62179.firebaseapp.com",
  projectId: "todos-62179"
};

firebase.initializeApp(config);
let db = firebase.firestore();

export default db;