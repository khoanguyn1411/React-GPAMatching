import { AppReact } from "@/utils/types/react";

import { AuthProvider } from "./AuthProvider";
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
            <RouterProvider>
              <AuthProvider>{children}</AuthProvider>
            </RouterProvider>
          </SnackbarProvider>
        </MediaContextProvider>
      </AppLocalizationProvider>
    </AppThemeProvider>
  );
};
