import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { ProjectService } from "@/services/projectService";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { PROJECT_QUERY_KEY } from "@/store/key";

import { ProjectItem } from "../../../../shared/others/project-item/ProjectItem";

export const ProjectWrapper: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: [PROJECT_QUERY_KEY],
    queryFn: () => ProjectService.getProjects(),
  });
  const isNoData = data == null || data.length === 0;

  if (isLoading) {
    return <CircleLoading mode="normal" />;
  }
  if (isNoData) {
    return <Typography>Không tìm thấy dữ liệu dự án</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {data.map((project) => (
        <Grid key={project.id} item xs={6}>
          <ProjectItem {...project} />
        </Grid>
      ))}
    </Grid>
  );
};
