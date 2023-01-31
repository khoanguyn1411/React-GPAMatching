import { Box } from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { routePaths } from "@/routes";
import { AppTab } from "@/shared/components/tab/Tab";
import { appColors, appShadows } from "@/theme/mui-theme";
import { useCommon } from "@/utils/hooks/useCommon";

import { JoinedProjectTab } from "./tabs/joined-project-tab/JoinedProjectTab";
import { MyProjectTab } from "./tabs/my-project-tab/MyProjectTab";

export const ProjectManagementContainer: FC = () => {
  useCommon();
  const { myProject, joinedProjects } = routePaths.home.children.project.children;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleTabChange = (key: string) => {
    if (key === "my-project") {
      navigate(myProject.url);
      return;
    }
    navigate(joinedProjects.url);
  };

  const getDefaultActiveTab = () => {
    if (pathname.includes(joinedProjects.path)) {
      return "project-joined";
    }
    return "my-project";
  };
  return (
    <Box bgcolor={appColors.backgroundBlur} minHeight="calc(100vh - 75px)">
      <AppTab
        onChange={handleTabChange}
        defaultActive={getDefaultActiveTab()}
        boxProps={{
          sx: {
            bgcolor: "white",
            zIndex: 100,
            boxShadow: appShadows.main,
            position: "sticky",
            top: 72,
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
            content: <JoinedProjectTab />,
            tabProps: { sx: { padding: 2.5 } },
          },
        ]}
      />
    </Box>
  );
};
