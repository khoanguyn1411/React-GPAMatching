import { createTheme } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
export const appColors = {
  primary: "rgba(0,126,164,1)",
  primaryLight: "rgba(0,126,164,0.05)",

  backgroundBlur: "rgba(251, 251, 251, 1)",

  borderPrimary: "rgba(170, 164, 164, 0.1)",

  textPrimary: "#333",
  textPrimaryLight: "rgba(19, 15, 38, 0.6)",

  warning: "rgba(250,204,21,1)",
  warningLight: "rgba(250,204,21,0.05)",

  success: "rgba(58,178,102,1)",
  successLight: "rgba(58,178,102,0.05)",
};

export const appShadows = {
  main: "1px 1px 5px rgb(0 0 0 / 40%)",
};

export const appPadding = {
  layout: "15px 0",
  container: "60px",
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
        h1: { fontSize: "22px", fontWeight: 600, letterSpacing: "0.5" },
        h2: { fontSize: "18px", fontWeight: 600 },
        h3: { fontSize: "16px", fontWeight: 700 },
        h4: { fontSize: "14px", fontWeight: 600 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 10px",
          borderRadius: "8px",
          fontWeight: 500,
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
    success: {
      main: appColors.success,
    },
    primary: {
      main: appColors.primary,
    },
  },
});
