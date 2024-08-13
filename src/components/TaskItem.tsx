import { useDrag, useDrop } from "react-dnd";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Task } from "../types/Task";

const ItemType = "TASK";

interface TaskItemProps {
  task: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  setSelectedTaskId: (id: string | null) => void;
  setTaskToDeleteId: (id: string | null) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  moveTask,
  setSelectedTaskId,
  setTaskToDeleteId,
  toggleTaskCompletion,
}) => {
  const navigate = useNavigate();

  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="bg-white dark:bg-[#171717] shadow-md rounded-lg p-4 flex flex-col"
    >
      <div
        onClick={() => navigate(`/tasks/${task.id}`)}
        className="hover:cursor-pointer"
      >
        <div className="flex justify-between">
          <h3
            className={`text-xl font-semibold ${
              task.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : ""
            }`}
          >
            {task.title}
          </h3>
          <div className="flex gap-1">
            <FaPen
              className="text-[#6C757D] cursor-pointer"
              height={23}
              width={23}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTaskId(task.id);
              }}
            />
            <FaTrash
              className="text-[#FF4D4F] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setTaskToDeleteId(task.id);
              }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {task.description}
        </p>
      </div>
      <div className="mt-auto pt-4 flex justify-between items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
          }}
          className={`py-1 px-2 rounded-md shadow ${
            task.completed
              ? "bg-green-500 text-white"
              : "bg-gray-300 dark:bg-dark-bg"
          }`}
        >
          {task.completed ? "Completed" : "Mark Complete"}
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
  );
};

export default TaskItem;
