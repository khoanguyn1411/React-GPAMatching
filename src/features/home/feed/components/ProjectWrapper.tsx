import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { ProjectFilterParams } from "@/core/models/filter-params/project-filter-params";
import { ProjectField } from "@/core/models/project-field";
import { ProjectService } from "@/services/projectService";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { QUERY_KEY } from "@/store/key";
import { useQueryParam } from "@/utils/hooks/useQueryParam";

import { ProjectItem } from "../../../../shared/others/project-item/ProjectItem";

export const ProjectWrapper: FC = () => {
  const { currentQueryParams } = useQueryParam<ProjectFilterParams>();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PROJECT, currentQueryParams],
    queryFn: () =>
      ProjectService.getProjects({
        skill: currentQueryParams.skill,
        field: currentQueryParams.field as ProjectField,
        search: currentQueryParams.search,
        page: currentQueryParams.page ? Number(currentQueryParams.page) : 0,
        limit: currentQueryParams.limit ? Number(currentQueryParams.limit) : 10,
      }),
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
