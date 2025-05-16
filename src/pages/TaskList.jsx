import { useState, useMemo, useCallback } from "react";
import useTasks from "../components/hooks/useTasks";
import TaskRow from "../components/TaskRow";

// FUNZIONE DI DEBOUNCE
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const { tasks, removeMultipleTasks } = useTasks();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const debounceSearch = useCallback(debounce(setQuery, 500), []);
  const toggleSelection = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds((prev) => prev.filter((id) => id !== taskId));
    } else {
      setSelectedTaskIds((prev) => [...prev, taskId]);
    }
  };
  console.log("render");

  const sortIcon = sortOrder === 1 ? "↓" : "↑";

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await removeMultipleTasks(selectedTaskIds);
      alert("Task eliminate con successo");
      setSelectedTaskIds([]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const filteredTask = useMemo(() => {
    const filtered = tasks.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let compare;

      if (sortBy === "title") {
        compare = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const statusOption = ["To do", "Doing", "Done"];
        compare =
          statusOption.indexOf(a.status) - statusOption.indexOf(b.status);
      } else if (sortBy === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        compare = dateA - dateB;
      }
      return compare * sortOrder;
    });
  }, [tasks, query, sortBy, sortOrder]);

  return (
    <div className="task-list">
      <h3>Lista</h3>
      <input
        type="text"
        placeholder="Cerca task..."
        onChange={(e) => debounceSearch(e.target.value)}
      />
      {selectedTaskIds.length > 0 && (
        <button onClick={handleDeleteSelected}>Elimina Tasks</button>
      )}
      <table>
        <thead>
          <tr>
            <th></th>
            <th onClick={() => handleSort("title")}>
              NOME {sortBy === "title" && sortIcon}
            </th>
            <th onClick={() => handleSort("status")}>
              STATO {sortBy === "status" && sortIcon}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              DATA DI CREAZIONE {sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTask.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              checked={selectedTaskIds.includes(task.id)}
              onToggle={toggleSelection}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
