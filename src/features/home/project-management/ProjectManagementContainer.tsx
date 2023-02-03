import { Box } from "@mui/material";
import { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { routePaths } from "@/routes";
import { AppTab } from "@/shared/components/tab/Tab";
import { appColors, appShadows } from "@/theme/mui-theme";
import { useCommon } from "@/utils/hooks/useCommon";

import { InterestedProjectsTab } from "./tabs/interested-projects-tab/InterestedProjectsTab";
import { JoinedProjectTab } from "./tabs/joined-project-tab/JoinedProjectTab";
import { MyProjectTab } from "./tabs/my-project-tab/MyProjectTab";
import { useProjectManagementQuery } from "./useProjectManagementQuery";

export const ProjectManagementContainer: FC = () => {
  useCommon();
  useProjectManagementQuery();
  const { myProject, joinedProjects, interestedProjects } =
    routePaths.home.children.project.children;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleTabChange = (key: string) => {
    if (key === myProject.path) {
      navigate(myProject.url);
      return;
    }
    if (key === joinedProjects.path) {
      navigate(joinedProjects.url);
      return;
    }
    navigate(interestedProjects.url);
  };

  const getDefaultActiveTab = useMemo(() => {
    return () => {
      if (pathname.includes(joinedProjects.path)) {
        return joinedProjects.path;
      }
      if (pathname.includes(interestedProjects.path)) {
        return interestedProjects.path;
      }
      return myProject.path;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
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
            key: myProject.path,
            label: "Dự án của tôi",
            content: <MyProjectTab />,
            tabProps: { sx: { padding: 2.5 } },
          },
          {
            key: interestedProjects.path,
            label: "Dự án đang quan tâm",
            content: <InterestedProjectsTab />,
            tabProps: { sx: { padding: 2.5 } },
          },
          {
            key: joinedProjects.path,
            label: "Dự án đang tham gia",
            content: <JoinedProjectTab />,
            tabProps: { sx: { padding: 2.5 } },
          },
        ]}
      />
    </Box>
  );
};
