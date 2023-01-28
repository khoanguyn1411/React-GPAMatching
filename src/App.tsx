import { useAuth } from "./features/auth/useAuth";
import { AppProvider } from "./provider";
import { RootRoutes } from "./routes/RootRoutes";

const App: React.FC = () => {
  useAuth();
  return (
    <AppProvider>
      <RootRoutes />
    </AppProvider>
  );
};
export default App;
