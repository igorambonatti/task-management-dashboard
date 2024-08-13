import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-dark-bg text-black dark:text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23e163] hover:bg-gray-300 dark:hover:bg-[#242424] transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <FaSun data-testid="fa-sun" size={20} />
      ) : (
        <FaMoon data-testid="fa-moon" size={20} />
      )}
    </button>
  );
};

export default DarkModeToggle;
