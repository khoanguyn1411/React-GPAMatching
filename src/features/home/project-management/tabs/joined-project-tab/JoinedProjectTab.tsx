import { FC } from "react";

import { ProjectTabBase } from "../my-project-tab/components/ProjectTabBase";

export const JoinedProjectTab: FC = () => {
  return (
    <ProjectTabBase tabDataKey="joinedProjects" errorMessage={"Bạn chưa tham gia dự án nào."} />
  );
};
