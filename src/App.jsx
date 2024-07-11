import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthCard from "./components/AuthCard";
import UserProfile from "./components/UserProfile";
import NavBar from "./components/NavBar";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import TaskManager from "./components/TaskManager";
import { FaGithub } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div
        className={`relative z-10 min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        } transition-colors duration-500 ease-in-out`}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="container mx-auto p-4 lg:p-10 transition-opacity duration-700 ease-in-out opacity-100">
          <Routes>
            <Route path="/" element={user ? <TaskManager /> : <AuthCard />} />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <div className="flex flex-col items-center justify-center mt-8 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-2 animate-bounce">
            Source Code 👇👇
          </h2>
          <a
            href="https://github.com/SAIKUMAR039/Todo-react-js"
            className="hover:animate-pulse"
          >
            <FaGithub
              size={45}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
            />
          </a>
        </div>
        <footer className="bg-gray-800 text-white text-center p-4 absolute bottom-0 w-full transition-transform duration-500 ease-in-out transform translate-y-0 hover:translate-y-2">
          Built by <span className="font-semibold">SAI KUMAR</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
