import { AppReact } from "@/utils/types/react";

import { AppLocalizationProvider } from "./LocalizationProvider";
import { MediaContextProvider } from "./MediaContextProvider";
import { RouterProvider } from "./RouterProvider";
import { AppThemeProvider } from "./ThemeProvider";

export const AppProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <AppThemeProvider>
      <AppLocalizationProvider>
        <MediaContextProvider>
          <RouterProvider>{children}</RouterProvider>
        </MediaContextProvider>
      </AppLocalizationProvider>
    </AppThemeProvider>
  );
};
