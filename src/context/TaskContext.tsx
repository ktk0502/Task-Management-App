import { createContext, useState, ReactNode } from "react";

export type Task = {
  progress: ReactNode;
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed";
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: number) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks([...tasks, task]);
  const editTask = (task: Task) =>
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  const deleteTask = (id: number) =>
    setTasks(tasks.filter((t) => t.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
