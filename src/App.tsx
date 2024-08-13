import AppProvider from "./context/AppProvider";
import AppRoutes from "./routes/Routes";

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
