// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz22U_L-5q2ktwsMF1nnu56ydHhXrFrCE",
  authDomain: "todo-react-js-project.firebaseapp.com",
  projectId: "todo-react-js-project",
  storageBucket: "todo-react-js-project.appspot.com",
  messagingSenderId: "760699620786",
  appId: "1:760699620786:web:f858b1847e4e7231c4e8ab",
  measurementId: "G-PTS2BWB7P2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
