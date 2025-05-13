import React, { createContext } from "react";
import { useState } from "react";
import useTasks from "../components/hooks/useTasks";

// STEP 1 => CREO E PREPARO USO DEL CONTESTO
const TaskGlobalContext = createContext();

// STEP 2 => USO IL PROVIDER PER PASSARE IL CONTESTO AI CHILDREN

export const TaskProvider = ({ children }) => {
  const { tasks, addTask, removeTask, updateTask } = useTasks();
  const [loading, setLoading] = useState(true);

  return (
    <TaskGlobalContext.Provider
      value={{ tasks, addTask, removeTask, updateTask, loading }}
    >
      {children}
    </TaskGlobalContext.Provider>
  );
};
