import { AppProvider } from "./providers";
import { RootRoutes } from "./routes/RootRoutes";

const App: React.FC = () => {
  return (
    <AppProvider>
      <RootRoutes />
    </AppProvider>
  );
};
export default App;
