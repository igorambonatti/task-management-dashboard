import { useState } from "react";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import TaskEditView from "../../components/TaskEditView";
import { useTaskContext } from "../../context/TaskContext";

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, deleteTask, toggleTaskCompletion } = useTaskContext();
  const navigate = useNavigate();

  const task = tasks.find((task) => task.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-bg text-gray-500 dark:text-gray-400">
        Task not found.
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-gray-100 flex">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 dark:bg-[#242424] p-2 rounded-full shadow hover:bg-gray-400"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-4xl font-bold text-center mb-8">Task Details</h1>
        <div className="bg-white dark:bg-[#171717] p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-3xl font-bold ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : ""
              }`}
            >
              {task.title}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="bg-gray-300 dark:bg-[#242424] p-2 rounded-md shadow hover:bg-gray-400 "
              >
                <FaPen />
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            {task.description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`py-2 px-4 rounded-md shadow ${
                task.completed
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 dark:bg-dark-bg"
              }`}
            >
              {task.completed ? "Completed" : "Mark as Complete"}
            </button>
            <span
              className={`text-sm ${
                task.priority === "High"
                  ? "text-red-500"
                  : task.priority === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {task.priority} Priority
            </span>
          </div>
        </div>
      </div>
      {isEditing && (
        <TaskEditView taskId={task.id} onClose={() => setIsEditing(false)} />
      )}
      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );
};

export default TaskDetailsPage;
