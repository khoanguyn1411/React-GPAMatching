import { Grid } from "@mui/material";
import { FC } from "react";

import { ProjectItem } from "../../../../shared/others/project-item/ProjectItem";

export const ProjectWrapper: FC = () => {
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
