import { useState, useRef, useMemo } from "react";
import useTasks from "../components/hooks/useTasks";
const symbols = '!@#$%^&*()-_=+[]{}|;:\\",.<>?/`~';

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("");
  const descrRef = useRef();
  const optRef = useRef();
  console.log("render");

  const { addTask } = useTasks();

  const taskTitleError = useMemo(() => {
    if (!taskTitle.trim()) return "Devi inserire un titolo.";
    if ([...taskTitle].some((char) => symbols.includes(char)))
      return "Non usare caratteri speciali";
    return "";
  }, [taskTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskTitleError) {
      return;
    }

    const newTask = {
      title: taskTitle,
      description: descrRef.current.value,
      status: optRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task creata!");

      setTaskTitle("");
      descrRef.current.value = "";
      optRef.current.value = "To do";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container-newtask">
        <h2>Aggiungi</h2>
        <div className="newtask-form">
          <form onSubmit={handleSubmit}>
            <label>
              <strong>Titolo</strong>{" "}
            </label>
            <input
              type="text"
              placeholder="Inserisci il titolo della task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            {taskTitleError && <p style={{ color: "red" }}>{taskTitleError}</p>}
            <label>
              <strong>Stato</strong>
            </label>
            <select ref={optRef} defaultValue="To do">
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            <label style={{ display: "block" }}>
              <strong>Inserisci la descrizione:</strong>{" "}
            </label>
            <textarea id="descr" placeholder="Scrivi qui...." ref={descrRef} />
            <button type="submit" disabled={taskTitleError}>
              Aggiungi
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
