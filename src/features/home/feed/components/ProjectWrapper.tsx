import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { http } from "@/api/api-core";

import { ProjectItem } from "../../../../shared/others/project-item/ProjectItem";

export const ProjectWrapper: FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["feed"],
    queryFn: () => http.get("feed"),
  });

  const isNoData = true;
  if (isNoData) {
    return <Typography>Không tìm thấy dữ liệu dự án</Typography>;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <ProjectItem />
      </Grid>
      <Grid item xs={6}>
        <ProjectItem />
      </Grid>
      <Grid item xs={6}>
        <ProjectItem />
      </Grid>
    </Grid>
  );
};
