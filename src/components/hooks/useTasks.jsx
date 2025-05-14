import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // TUTTE
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  // AGGIUNGI UNA TASK
  const addTask = async (newTask) => {
    const resp = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await resp.json();
    if (!success) throw new Error(message);

    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // RIMUOVI TASK
  const removeTask = async (taskId) => {
    const resp = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const { success, message } = await resp.json();
    if (!success) throw new Error(message);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // MODIFICA TASK (vuoto, come richiesto)
  const updateTask = async (updatedTask) => {
    const resp = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const { success, message, task } = await resp.json();
    if (!success) throw new Error(message);

    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? task : t))
    );
  };
  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
  };
}
