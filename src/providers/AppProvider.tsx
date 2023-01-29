import { AppReact } from "@/utils/types/react";

import { AuthProvider } from "./AuthProvider";
import { CheckProvider } from "./CheckProvider";
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
            <AuthProvider>
              <RouterProvider>
                <CheckProvider>{children}</CheckProvider>
              </RouterProvider>
            </AuthProvider>
          </SnackbarProvider>
        </MediaContextProvider>
      </AppLocalizationProvider>
    </AppThemeProvider>
  );
};
