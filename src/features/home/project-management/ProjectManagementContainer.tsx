import { Box } from "@mui/material";
import { FC } from "react";

import { AppTab } from "@/shared/components/tab/Tab";
import { appColors, appShadows } from "@/theme/mui-theme";

import { MyProjectTab } from "./tabs/my-project-tab/MyProjectTab";

export const ProjectManagementContainer: FC = () => {
  return (
    <Box bgcolor={appColors.backgroundBlur}>
      <AppTab
        boxProps={{
          sx: {
            bgcolor: "white",
            zIndex: 100,
            boxShadow: appShadows.main,
            position: "sticky",
            top: 73,
          },
        }}
        listTab={[
          {
            key: "my-project",
            label: "Dự án của tôi",
            content: <MyProjectTab />,
            tabProps: { sx: { padding: 2.5 } },
          },
          {
            key: "project-joined",
            label: "Dự án đang tham gia",
            content: <div>string 2</div>,
            tabProps: { sx: { padding: 2.5 } },
          },
        ]}
      />
    </Box>
  );
};
