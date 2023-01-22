import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { AppReact } from "@/utils/types/react";

import { MediaContextProvider } from "./MediaContextProvider";
import { RouterProvider } from "./RouterProvider";
import { AppThemeProvider } from "./ThemeProvider";

export const AppProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <AppThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MediaContextProvider>
          <RouterProvider>{children}</RouterProvider>
        </MediaContextProvider>
      </LocalizationProvider>
    </AppThemeProvider>
  );
};
