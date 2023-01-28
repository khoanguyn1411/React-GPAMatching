import { AppProvider } from "./provider";
import { RootRoutes } from "./routes/RootRoutes";

const App: React.FC = () => {
  return (
    <AppProvider>
      <RootRoutes />
    </AppProvider>
  );
};
export default App;
