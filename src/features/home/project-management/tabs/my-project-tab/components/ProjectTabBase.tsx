import { Container, Grid, Typography } from "@mui/material";
import { FC } from "react";

import { Project } from "@/core/models/project";
import { ProjectByUser } from "@/core/models/project-by-user";
import { ProjectItem } from "@/shared/others/project-item/ProjectItem";
import { QUERY_KEY } from "@/store/key";

import { useProjectManagement } from "../../../useProjectManagementQuery";

type Props = {
  errorMessage: string;
  tabDataKey: keyof ProjectByUser;
};

export const ProjectTabBase: FC<Props> = ({ errorMessage, tabDataKey }) => {
  const projectInfo = useProjectManagement();
  if (projectInfo == null || projectInfo.data == null || projectInfo.isError) {
    return (
      <Container>
        <Typography>Không lấy được thông tin dự án</Typography>
      </Container>
    );
  }

  const projectList = projectInfo.data[tabDataKey] as Project[];

  if (projectList.length === 0) {
    return (
      <Container>
        <Typography>{errorMessage}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {projectList.map((project) => (
          <Grid key={project.id} item xs={6}>
            <ProjectItem invalidateQueryKeys={[QUERY_KEY.PROJECT_BY_USER]} data={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
