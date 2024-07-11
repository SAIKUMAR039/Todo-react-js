import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthCard() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Sign in successful!");
      } catch (error) {
        console.error("Error signing in:", error);
        toast.error("Error signing in. Please try again.");
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Sign up successful! Please sign in.");
        setIsSignIn(true);
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h2>
      <form onSubmit={handleAuth} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg transition duration-300 hover:bg-blue-600"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-blue-500 hover:underline"
        >
          {isSignIn ? "Create an account" : "Already have an account? Sign In"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthCard;
