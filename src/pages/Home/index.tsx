import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import DarkModeToggle from "../../components/DarkModeToggle";
import FilterSortOptions from "../../components/FilterSortOptions";
import TaskInputForm from "../../components/TaskInputForm";
import TaskList from "../../components/TaskList";

const Home: React.FC = () => {
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);

  const createNewTask = () => {
    setIsCreatingNewTask(true);
  };

  const closeModal = () => {
    setIsCreatingNewTask(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-gray-100 flex">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-4xl font-bold text-center mb-8">
          Task Management Dashboard
        </h1>
        <div className="flex justify-end mb-4 items-center">
          <DarkModeToggle />
          <button
            onClick={createNewTask}
            className="ml-4 bg-[#23e163] text-white p-2 rounded-full shadow hover:bg-[#1ca853] focus:outline-none"
          >
            <FaPlus size={20} />
          </button>
        </div>
        <FilterSortOptions />
        <TaskList />
      </div>
      <TaskInputForm isOpen={isCreatingNewTask} onClose={closeModal} />
    </div>
  );
};

export default Home;
