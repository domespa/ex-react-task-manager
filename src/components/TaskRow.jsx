import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function TaskRow({ task, checked, onToggle }) {
  const finalTask = useMemo(() => {
    // FORMATTAZIONE DELLA DATA
    const formattedDate = new Date(task.createdAt).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // SETUP DEL COLORE
    const getStatusColor = (status) => {
      switch (status) {
        case "To do":
          return { backgroundColor: "red" };
        case "Doing":
          return { backgroundColor: "hsl(56, 84.80%, 46.50%)" };
        case "Done":
          return { backgroundColor: "green" };
        default:
          return;
      }
    };

    // RITORNO TUTTO
    return {
      ...task,
      formattedDate,
      statusColor: getStatusColor(task.status),
    };
  }, [task]);

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(task.id)}
        />
      </td>
      <td>
        <Link to={`/task/${task.id}`}>{finalTask.title}</Link>
      </td>
      <td style={finalTask.statusColor}>{task.status}</td>
      <td>{finalTask.formattedDate}</td>
    </tr>
  );
}
