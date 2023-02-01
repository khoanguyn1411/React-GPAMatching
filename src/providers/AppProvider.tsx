import { AppReact } from "@/utils/types/react";

import { AuthProvider } from "./AuthProvider";
import { GlobalProvider } from "./GlobalProvider";
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
                <GlobalProvider>{children}</GlobalProvider>
              </RouterProvider>
            </AuthProvider>
          </SnackbarProvider>
        </MediaContextProvider>
      </AppLocalizationProvider>
    </AppThemeProvider>
  );
};
