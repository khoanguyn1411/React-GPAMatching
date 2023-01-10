import { AppReact } from "@/utils/types/react";

import { MediaContextProvider } from "./MediaContextProvider";
import { RouterProvider } from "./RouterProvider";
import { AppThemeProvider } from "./ThemeProvider";

export const AppProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <AppThemeProvider>
      <MediaContextProvider>
        <RouterProvider>{children}</RouterProvider>
      </MediaContextProvider>
    </AppThemeProvider>
  );
};
