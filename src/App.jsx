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
      <div className="relative bg-gray-600 z-10 min-h-screen">
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="container mx-auto p-4 lg:p-10">
          <Routes>
            <Route path="/" element={user ? <TaskManager /> : <AuthCard />} />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
