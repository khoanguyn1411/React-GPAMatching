import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { routePaths } from "@/routes";
import { ProjectService } from "@/services/projectService";
import { PROJECT_QUERY_KEY } from "@/store/key";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";
import { useQueryParam } from "@/utils/hooks/useQueryParam";

export const useProjectDetailQuery = () => {
  const { currentQueryParams } = useQueryParam<{ id: string }>();

  const queryValues = useQuery({
    queryKey: [PROJECT_QUERY_KEY, currentQueryParams.id],
    queryFn: () => ProjectService.getProjectById(currentQueryParams.id),
  });
  const { navigate } = useNavigateWithTransition();

  useEffect(() => {
    console.log(currentQueryParams.id);
    if (!currentQueryParams.id) {
      navigate(routePaths.home.children.feed.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return queryValues;
};
