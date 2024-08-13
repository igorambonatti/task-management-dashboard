import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import { useTaskContext } from "../context/TaskContext";
import InputField from "./Input";

interface TaskInputFormProps {
  isOpen: boolean;
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

const TaskInputForm: React.FC<TaskInputFormProps> = ({ isOpen, onClose }) => {
  const { addTask } = useTaskContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addTask(data.title, data.description, data.priority);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="task-input-form"
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-white dark:bg-[#171717] p-6 rounded-lg shadow-lg w-full max-w-md relative z-50">
        <form onSubmit={handleSubmit(onSubmit)} data-testid="task-form">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <button
              onClick={onClose}
              data-testid="close-button"
              className="text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <FaTimes size={18} />
            </button>
          </div>
          <InputField
            label="Title"
            name="title"
            register={register("title")}
            error={errors.title?.message}
            data-testid="title-input"
          />
          <InputField
            label="Description"
            name="description"
            register={register("description")}
            error={errors.description?.message}
            data-testid="description-input"
          />
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              data-testid="priority-label"
            >
              Priority
            </label>
            <select
              id="priority"
              {...register("priority")}
              className={`mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-[#23e163] focus:border-[#23e163] dark:bg-dark-bg dark:border-gray-600 dark:text-gray-300 ${
                errors.priority ? "border-red-500" : ""
              }`}
              data-testid="priority-select"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <p
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                data-testid="priority-error"
              >
                {errors.priority.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 dark:bg-dark-bg text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 dark:hover:bg-[#252525]"
              data-testid="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#23e163] text-white py-2 px-4 rounded-md shadow hover:bg-[#1ca853] focus:outline-none"
              data-testid="submit-button"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
        data-testid="overlay"
      />
    </div>
  );
};

export default TaskInputForm;
