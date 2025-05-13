import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../components/hooks/useTasks";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask } = useTasks();
  const navigate = useNavigate();

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
          <p>{formattedDate}</p>
          <button onClick={handleDelete}>Elimina Task</button>
        </div>
      </div>
    </div>
  );
}
