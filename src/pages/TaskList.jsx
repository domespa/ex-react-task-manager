import useTasks from "../components/hooks/useTasks";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="task-list">
      <h3>Lista</h3>
      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>STATO</th>
            <th>DATA DI CREAZIONE</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
