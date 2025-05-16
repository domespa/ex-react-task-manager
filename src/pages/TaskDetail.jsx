import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../components/hooks/useTasks";
import { useState } from "react";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const task = tasks.find((t) => t.id === parseInt(id));

  const formattedDate = task?.createdAt
    ? new Date(task.createdAt).toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const handleDelete = async () => {
    try {
      await removeTask(id);
      alert("Task eliminata con successo!");
      navigate("/");
    } catch (error) {
      alert(`Errore nell'eliminazione della task: ${error.message}`);
    }
  };

  const handleUpdate = async (editTask) => {
    try {
      await updateTask(editTask);
      alert("Task modificata con successo");

      setShowEditModal(false);
    } catch (error) {
      alert(`Errore nella modifica della task: ${error.message}`);
    }
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  if (!task) {
    return <div>Task non trovata o ancora in caricamento...</div>;
  }

  return (
    <div className="container-task">
      <div className="card-task">
        <h2>{task.title}</h2>
        <div className="par-task">
          <p>
            <strong>Descrizione: </strong>
            {task.description}
          </p>
          <p>
            <strong>Stato: </strong>
            {task.status}
          </p>
          <p>
            <strong>Creata il: </strong>
            {formattedDate}
          </p>
          <div className="cont-action">
            <button onClick={handleDeleteModal}>Elimina Task</button>
            <button onClick={() => setShowEditModal(true)}>Modifica</button>
          </div>

          <Modal
            title={task.title}
            content={task.description}
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            confirmText="Vuoi Eliminare?"
          />

          <EditTaskModal
            task={task}
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}
