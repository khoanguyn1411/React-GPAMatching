import { Stack } from "@mui/system";

import { AppReact } from "@/utils/types/react";

export const InformationContentWrapper: AppReact.FC.Children = ({ children }) => {
  return (
    <Stack padding={3} height="calc(100vh - 120px)" overflow={"auto"}>
      {children}
    </Stack>
  );
};
