// src/components/SignOut.jsx
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function SignOut() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default SignOut;
