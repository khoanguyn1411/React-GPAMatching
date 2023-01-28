import { AppReact } from "@/utils/types/react";

import { AppLocalizationProvider } from "./LocalizationProvider";
import { MediaContextProvider } from "./MediaContextProvider";
import { RouterProvider } from "./RouterProvider";
import { SnackbarProvider } from "./SnackbarProvider";
import { AppThemeProvider } from "./ThemeProvider";

export const AppProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <AppThemeProvider>
      <AppLocalizationProvider>
        <MediaContextProvider>
          <SnackbarProvider>
            <RouterProvider>{children}</RouterProvider>
          </SnackbarProvider>
        </MediaContextProvider>
      </AppLocalizationProvider>
    </AppThemeProvider>
  );
};
