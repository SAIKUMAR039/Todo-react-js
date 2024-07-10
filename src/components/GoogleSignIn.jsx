// src/components/GoogleSignIn.jsx
import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function GoogleSignIn() {
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("User signed in with Google:", result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-red-500 text-white p-2 rounded mt-4"
    >
      Sign In with Google
    </button>
  );
}

export default GoogleSignIn;
