import { Container, Grid } from "@mui/material";
import { FC } from "react";

import { ProjectItem } from "@/shared/others/project-item/ProjectItem";

export const JoinedProjectTab: FC = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {/* <Grid item xs={6}>
          <ProjectItem />
        </Grid>
        <Grid item xs={6}>
          <ProjectItem />
        </Grid>
        <Grid item xs={6}>
          <ProjectItem />
        </Grid> */}
      </Grid>
    </Container>
  );
};
