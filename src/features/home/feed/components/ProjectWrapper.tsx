import { Box, Button, Grid, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, useState } from "react";

import { ProjectFilterParams } from "@/core/models/filter-params/project-filter-params";
import { Pagination } from "@/core/models/pagination";
import { Project } from "@/core/models/project";
import { ProjectField } from "@/core/models/project-field";
import { ProjectService } from "@/services/projectService";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { QUERY_KEY, QUERY_MODIFIER } from "@/store/key";
import { useQueryParam } from "@/utils/hooks/useQueryParam";

import { ProjectItem } from "../../../../shared/others/project-item/ProjectItem";

export const ProjectWrapper: FC = () => {
  const { currentQueryParams } = useQueryParam<ProjectFilterParams>();
  const [currentPage, setCurrentPage] = useState<number>(Pagination.DEFAULT_PAGINATION_LIMIT);

  const { data, isError, isFetchingNextPage, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Pagination<Project>>({
      queryKey: [QUERY_KEY.PROJECT, currentQueryParams, QUERY_MODIFIER.INFINITIVE],
      getNextPageParam: (prev) => (prev.hasNext ? currentPage : null),
      queryFn: ({ pageParam = Pagination.DEFAULT_PAGINATION_PAGE }) =>
        ProjectService.getProjects({
          skill: currentQueryParams.skill,
          field: currentQueryParams.field as ProjectField,
          search: currentQueryParams.search,
          page: pageParam,
          limit: Pagination.DEFAULT_PAGINATION_LIMIT,
        }),
    });

  const handleLoadMore = () => {
    fetchNextPage({ pageParam: currentPage + 1 });
    setCurrentPage((prev) => prev + 1);
  };

  const isNoData =
    isError || data == null || data.pages.flatMap((project) => project.result).length === 0;

  if (isLoading) {
    return <CircleLoading mode="normal" />;
  }
  if (isNoData) {
    return <Typography>Không tìm thấy dữ liệu dự án</Typography>;
  }

  return (
    <>
      <Grid container spacing={3}>
        {data.pages
          .flatMap((project) => project.result)
          .map((project) => (
            <Grid key={project.id} item xs={6}>
              <ProjectItem invalidateQueryKeys={[QUERY_KEY.PROJECT]} data={project} />
            </Grid>
          ))}
      </Grid>
      <Box mt={3}>
        {isFetchingNextPage && <CircleLoading mode="normal" />}
        {hasNextPage && !isFetchingNextPage && (
          <Button fullWidth onClick={handleLoadMore}>
            Load more
          </Button>
        )}
      </Box>
    </>
  );
};
