import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { FC, useEffect, useState } from "react";

import { Project } from "@/core/models/project";
import { ProjectField } from "@/core/models/project-field";
import { ProjectService } from "@/services/projectService";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { ProjectItem } from "@/shared/others/project-item/ProjectItem";
import { QUERY_KEY } from "@/store/key";

function getRandomEntities<T extends readonly any[]>(array: T | null, numberToGet: number) {
  return _.sampleSize<T>(array, numberToGet) as unknown as T;
}

type Props = {
  field: ProjectField | null;
};

export const ProjectsSuggestion: FC<Props> = ({ field }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.PROJECT],
    queryFn: () =>
      ProjectService.getProjects({
        skill: null,
        field: field ?? null,
        search: null,
        page: 0,
        limit: 10,
      }),
  });

  const [randomProjectSuggestion, setRandomProjectSuggestion] = useState<readonly Project[] | null>(
    null,
  );

  useEffect(() => {
    setRandomProjectSuggestion(getRandomEntities(data ?? null, 2));
  }, [data]);

  if (isLoading) {
    return <CircleLoading mode="normal" />;
  }

  if (isError || data == null || randomProjectSuggestion == null) {
    return <Typography>Không lấy được dữ liệu</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {randomProjectSuggestion.map((project, index) => (
        <Grid key={`${project.id}-${index}`} item xs={6}>
          <ProjectItem {...project} />
        </Grid>
      ))}
    </Grid>
  );
};
