import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

/**
 * Material UI theme.
 * Learn more: https://mui.com/customization/theming/.
 */
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});
