import { Stack } from "@mui/material";

import { appColors } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

type Props = {
  isFullHeight?: boolean;
};

export const SectionCardWrapper: AppReact.FC.PropsWithChildren<Props> = ({
  children,
  isFullHeight = false,
}) => {
  return (
    <Stack
      spacing={2}
      component="section"
      padding={3}
      height={isFullHeight ? "100%" : "fit-content"}
      bgcolor="white"
      border={`1.5px solid ${appColors.borderPrimary}`}
      borderRadius="8px"
    >
      {children}
    </Stack>
  );
};
