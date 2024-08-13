import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/Task";

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  addTask: (
    title: string,
    description: string,
    priority: "High" | "Medium" | "Low"
  ) => void;
  editTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  sortTasks: (order: "asc" | "desc") => void;
  filterTasks: (priority: "High" | "Medium" | "Low" | "All") => void;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setFilteredTasks(tasks);
  }, [tasks]);

  const addTask = (
    title: string,
    description: string,
    priority: "High" | "Medium" | "Low"
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortTasks = (order: "asc" | "desc") => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (order === "desc") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });
    setFilteredTasks(sortedTasks);
  };

  const filterTasks = (priority: "High" | "Medium" | "Low" | "All") => {
    if (priority === "All") {
      setFilteredTasks(tasks);
    } else {
      const filteredTasks = tasks.filter((task) => task.priority === priority);
      setFilteredTasks(filteredTasks);
    }
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        addTask,
        editTask,
        deleteTask,
        toggleTaskCompletion,
        sortTasks,
        filterTasks,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
