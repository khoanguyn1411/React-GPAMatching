import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

/**
 * Material UI theme.
 * Learn more: https://mui.com/customization/theming/.
 */
export const muiTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: { fontSize: "20px", fontWeight: "bold" },
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
      main: red[500],
    },
    background: {
      default: "#333",
    },
  },
});
