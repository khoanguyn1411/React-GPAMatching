import { Container } from "@mui/material";

import { appPadding } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

export const Main: AppReact.FC.Children = ({ children }) => {
  return (
    <Container component="main" sx={{ padding: appPadding.layout, marginY: "20px" }}>
      {children}
    </Container>
  );
};
