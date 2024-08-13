import { TaskProvider } from "./TaskContext";
import { ThemeProvider } from "./ThemeContext";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <TaskProvider>{children}</TaskProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
