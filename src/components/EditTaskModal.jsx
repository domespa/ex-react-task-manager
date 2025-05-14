import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editTask, setEditTask] = useState(task);
  const formRef = useRef();

  useEffect(() => {
    setEditTask(task);
  }, [task]);

  const changeEditTask = (key, event) => {
    setEditTask((prevTask) => ({ ...prevTask, [key]: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editTask);
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form className="update-form" ref={formRef} onSubmit={handleSubmit}>
          <label>
            <strong>Nome task:</strong>
            <br></br>
            <input
              type="text"
              value={editTask.title || ""}
              onChange={(e) => changeEditTask("title", e)}
              required
            />
          </label>
          <label>
            <strong>Descrizione:</strong> <br></br>
            <textarea
              value={editTask.description || ""}
              onChange={(e) => changeEditTask("description", e)}
            />
          </label>
          <label>
            <strong>Stato:</strong>
            <br></br>
            <select
              value={editTask.status || "To do"}
              onChange={(e) => changeEditTask("status", e)}
            >
              {["To do", "Doing", "Done"].map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => formRef.current.requestSubmit()}
    />
  );
}
