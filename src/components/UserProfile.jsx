// src/components/UserProfile.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";

function UserProfile() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchTasks(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTasks = async (userId) => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const userTasks = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((task) => task.userId === userId);
    setTasks(userTasks);
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    await updateDoc(doc(db, "tasks", taskId), {
      completed: !task.completed,
    });
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (!user) return null;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">User Profile</h2>
      <div className="mb-4">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        Sign Out
      </button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 bg-white rounded mb-2 shadow"
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={`flex-1 cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
