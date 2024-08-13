import { useTaskContext } from "../context/TaskContext";

const FilterSortOptions: React.FC = () => {
  const { sortTasks, filterTasks } = useTaskContext();

  const handleSort = (order: "asc" | "desc") => {
    sortTasks(order);
  };

  const handleFilter = (priority: "High" | "Medium" | "Low" | "All") => {
    filterTasks(priority);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex space-x-4 mb-4 sm:mb-0">
        <button
          onClick={() => handleSort("asc")}
          className="py-2 px-4 rounded-md shadow bg-gray-200 dark:bg-[#171717] dark:text-gray-300"
        >
          Sort by Date (Asc)
        </button>
        <button
          onClick={() => handleSort("desc")}
          className="py-2 px-4 rounded-md shadow bg-gray-200 dark:bg-[#171717] dark:text-gray-300"
        >
          Sort by Date (Desc)
        </button>
      </div>
      <div>
        <select
          onChange={(e) =>
            handleFilter(e.target.value as "High" | "Medium" | "Low" | "All")
          }
          className="py-2 px-4 rounded-md shadow bg-gray-200 text-dark-bg dark:bg-[#171717] dark:text-gray-300 focus:outline-none hover:cursor-pointer"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortOptions;
