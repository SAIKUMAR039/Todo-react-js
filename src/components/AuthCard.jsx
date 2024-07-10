// src/components/AuthCard.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

function AuthCard() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, Name, email, password);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">{isSignIn ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white border p-2 rounded mt-2"
        >
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-blue-500"
        >
          {isSignIn ? "Create an account" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}

export default AuthCard;