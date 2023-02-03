import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppProvider } from "./providers";
import { RootRoutes } from "./routes/RootRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      retryDelay: 4000,
      refetchInterval: 30 * 1000,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RootRoutes />
      </AppProvider>
    </QueryClientProvider>
  );
};
export default App;
