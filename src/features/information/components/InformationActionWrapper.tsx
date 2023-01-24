import { Stack } from "@mui/material";

import { AppReact } from "@/utils/types/react";

export const InformationActionWrapper: AppReact.FC.Children = ({ children }) => {
  return (
    <Stack padding={"20px"} paddingBottom={0} direction="row" justifyContent="end" spacing={1.5}>
      {children}
    </Stack>
  );
};
