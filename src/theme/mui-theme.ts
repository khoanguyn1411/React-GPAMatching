import { createTheme } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
export const appColors = {
  primary: "rgba(0,126,164,1)",
  primaryLight: "rgba(0,126,164,0.1)",
  backgroundBlur: "rgba(255, 255, 255, 0.8)",
  textPrimary: "#333",
  textPrimaryLight: "rgba(170, 164, 164, 0.8)",
};

/**
 * Material UI theme.
 * Learn more: https://mui.com/customization/theming/.
 */
export const muiTheme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#F3F4F6",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: "100%",
          background: "#F3F4F6",
          border: "none",
        },
        input: {
          padding: "10px !important",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: { fontSize: "20px", fontWeight: 500, letterSpacing: "0.8px" },
        h2: { fontSize: "18px", fontWeight: 500 },
        h3: { fontSize: "16px", fontWeight: 500 },
        h4: { fontSize: "14px", fontWeight: 500 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
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
  },
});
