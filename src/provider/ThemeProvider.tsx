import { ThemeProvider } from "@emotion/react";

import { muiTheme } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

export const AppThemeProvider: AppReact.FC.Children = ({ children }) => {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};
