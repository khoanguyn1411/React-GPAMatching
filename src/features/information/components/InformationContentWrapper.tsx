import { Box } from "@mui/material";

import { AppReact } from "@/utils/types/react";

export const InformationContentWrapper: AppReact.FC.Children = ({ children }) => {
  return (
    <Box padding={3} height="calc(100vh - 120px)" overflow={"auto"}>
      {children}
    </Box>
  );
};
