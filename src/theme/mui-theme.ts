import { createTheme } from "@mui/material";

export const appColors = {
  primary: "#455A64",
  backgroundBlur: "rgba(255, 255, 255, 0.8)",
};

/**
 * Material UI theme.
 * Learn more: https://mui.com/customization/theming/.
 */
export const muiTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: { fontSize: "25px", fontWeight: "bold", letterSpacing: "1.2px" },
        h2: { fontSize: "20px", fontWeight: "bold" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px",
          borderRadius: "10px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "10px",
          borderRadius: "10px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: appColors.primary,
    },
    background: {
      default: "#333",
    },
  },
});
