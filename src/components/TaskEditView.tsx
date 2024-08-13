import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useTaskContext } from "../context/TaskContext";
import ConfirmationDialog from "./ConfirmationDialog";
import InputField from "./Input";

interface TaskEditViewProps {
  taskId: string;
  onClose: () => void;
}

interface IFormInput {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string()
    .oneOf(["High", "Medium", "Low"])
    .required("Priority is required"),
});

const TaskEditView: React.FC<TaskEditViewProps> = ({ taskId, onClose }) => {
  const { tasks, editTask, deleteTask } = useTaskContext();
  const task = tasks.find((task) => task.id === taskId);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("priority", task.priority);
    }
  }, [task, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (task) {
      editTask(task.id, {
        title: data.title,
        description: data.description,
        priority: data.priority,
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      onClose();
    }
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#171717] p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Title"
            name="title"
            register={register("title")}
            error={errors.title?.message}
          />
          <InputField
            label="Description"
            name="description"
            register={register("description")}
            error={errors.description?.message}
          />
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Priority
            </label>
            <select
              id="priority"
              {...register("priority")}
              className={`mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-[#23e163] focus:border-[#23e163] dark:bg-dark-bg dark:border-gray-600 dark:text-gray-300 ${
                errors.priority ? "border-red-500" : ""
              }`}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.priority.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 dark:bg-dark-bg text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 dark:hover:bg-[#252525]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#23e163] text-white py-2 px-4 rounded-md shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmDialog(true)}
              className="bg-[#f30816] text-white py-2 px-4 rounded-md shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this task?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
      <div
        className="fixed inset-0 bg-black opacity-50 -z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default TaskEditView;
