// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxJe8jSJntU7oPsCOpfZgh9LYwQTBKkRc",
  authDomain: "zety-ai.firebaseapp.com",
  projectId: "zety-ai",
  storageBucket: "zety-ai.appspot.com",
  messagingSenderId: "824954019711",
  appId: "1:824954019711:web:fcc01111658b725e0a444a",
  measurementId: "G-X1Z9LWBCS5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
