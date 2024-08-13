import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTaskContext } from "../context/TaskContext";
import ConfirmationDialog from "./ConfirmationDialog";
import TaskEditView from "./TaskEditView";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { filteredTasks, toggleTaskCompletion, deleteTask, moveTask } =
    useTaskContext();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (taskToDeleteId) {
      deleteTask(taskToDeleteId);
      setTaskToDeleteId(null);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-7">
            No tasks available. Start by adding a new task.
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              index={index}
              task={task}
              moveTask={moveTask}
              setSelectedTaskId={setSelectedTaskId}
              setTaskToDeleteId={setTaskToDeleteId}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          ))
        )}
        {selectedTaskId && (
          <TaskEditView
            taskId={selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
        {taskToDeleteId && (
          <ConfirmationDialog
            message="Are you sure you want to delete this task?"
            onConfirm={handleDelete}
            onCancel={() => setTaskToDeleteId(null)}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default TaskList;
