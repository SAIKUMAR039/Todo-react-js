import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const docRef = await addDoc(collection(db, "tasks"), {
      text: newTask,
      completed: false,
      userId: user.uid,
    });
    setTasks([...tasks, { id: docRef.id, text: newTask, completed: false }]);
    setNewTask("");
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

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-screen-lg mx-auto">
      <form onSubmit={addTask} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="w-full sm:w-64 p-2 border rounded mb-2 text-black"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 text-black rounded mb-2 shadow"
          >
            <button
              onClick={() => toggleComplete(task.id)}
              className={`flex-1 cursor-pointer text-black ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              role="button"
              tabIndex={0}
            >
              {task.text}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-green-500 text-white p-2 rounded"
            >
              Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
