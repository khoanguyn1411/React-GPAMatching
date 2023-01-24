import { Box } from "@mui/material";
import { FC } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  shouldShowTab: boolean;
}

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, index, shouldShowTab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={!shouldShowTab}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {shouldShowTab && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
