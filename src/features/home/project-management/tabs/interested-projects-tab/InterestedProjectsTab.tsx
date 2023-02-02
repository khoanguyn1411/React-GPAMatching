import { FC } from "react";

import { ProjectTabBase } from "../my-project-tab/components/ProjectTabBase";

export const InterestedProjectsTab: FC = () => {
  return (
    <ProjectTabBase errorMessage="Bạn chưa quan tâm dự án nào." tabDataKey="requestedProjects" />
  );
};
