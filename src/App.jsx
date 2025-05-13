import { BrowserRouter, Route, Routes } from "react-router";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import Header from "./components/Header/Header";
import { TaskProvider } from "./context/TaskGlobalContext";

export default function App() {
  return (
    <div className="container">
      <TaskProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </div>
  );
}
