// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function NavBar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">To-Do List</h1>
        <div>
          <Link to="/" className="text-white px-4">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="text-white px-4">
                Profile
              </Link>
              <button
                onClick={() => auth.signOut()}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-white px-4">
                Sign In
              </Link>
              <Link to="/" className="text-white px-4">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
