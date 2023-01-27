import { Box, Container } from "@mui/material";

import { appPadding } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

type Props = {
  shouldNotPadding?: boolean;
};

export const Main: AppReact.FC.PropsWithChildren<Props> = ({
  children,
  shouldNotPadding = false,
}) => {
  const Element = (shouldNotPadding ? Box : Container) as React.ElementType;
  return (
    <Element
      component="main"
      sx={{
        padding: !shouldNotPadding ? appPadding.layout : null,
        paddingY: !shouldNotPadding ? "30px" : null,
      }}
    >
      {children}
    </Element>
  );
};
