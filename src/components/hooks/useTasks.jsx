import { useState, useEffect, useReducer } from "react";
import tasksReducer from "../../reducers/tasksReducer";

export default function useTasks() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, []);
  const API_URL = import.meta.env.VITE_API_URL;

  // TUTTE
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => dispatchTasks({ type: "LOAD_TASKS", payload: data }))
      .catch((error) => console.error(error));
  }, []);

  // AGGIUNGI UNA TASK
  const addTask = async (newTask) => {
    const taskExists = tasks.some((t) => t.title === newTask.title);
    if (taskExists) {
      throw new Error("Esiste già task con questo nome");
    }
    const resp = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await resp.json();
    if (!success) throw new Error(message);

    dispatchTasks({ type: "ADD_TASK", payload: task });
  };

  // RIMUOVI TASK
  const removeTask = async (taskId) => {
    const resp = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const { success, message } = await resp.json();
    if (!success) throw new Error(message);

    dispatchTasks({ type: "REMOVE_TASK", payload: taskId });
  };

  const removeMultipleTasks = async (taskIds) => {
    const deleteRequests = taskIds.map((taskId) =>
      fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" }).then((res) =>
        res.json()
      )
    );
    const results = await Promise.allSettled(deleteRequests);
    const fullFilledDeletions = [];
    const rejectedDeletions = [];
    results.forEach((result, index) => {
      const taskId = taskIds[index];
      if (result.status === "fulfilled" && result.value.success) {
        fullFilledDeletions.push(taskId);
      } else {
        rejectedDeletions.push(taskId);
      }
    });
    if (fullFilledDeletions.length > 0) {
      dispatchTasks({
        type: "REMOVE_MULTIPLE_TASKS",
        payload: fullFilledDeletions,
      });
    }
    if (rejectedDeletions.length > 0)
      throw new Error(
        `Errore eliminazione task, ${rejectedDeletions.join(", ")}`
      );
  };

  // MODIFICA TASK (vuoto, come richiesto)
  const updateTask = async (updatedTask) => {
    const taskWithSameTitle = tasks.find((t) => t.title === updatedTask.title);
    if (taskWithSameTitle && taskWithSameTitle.id !== updatedTask.id) {
      throw new Error("Esiste già task con questo nome");
    }
    const resp = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const { success, message, task } = await resp.json();
    if (!success) throw new Error(message);

    dispatchTasks({ type: "UPDATE_TASK", payload: task });
  };
  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
    removeMultipleTasks,
  };
}
