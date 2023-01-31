import { useQuery } from "@tanstack/react-query";

import { routePaths } from "@/routes";
import { ProjectService } from "@/services/projectService";
import { QUERY_KEY } from "@/store/key";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";
import { useQueryParam } from "@/utils/hooks/useQueryParam";

export const useProjectDetailQuery = () => {
  const { currentQueryParams } = useQueryParam<{ id: string }>();

  const { navigate } = useNavigateWithTransition();

  const queryValues = useQuery({
    queryKey: [QUERY_KEY.PROJECT, currentQueryParams.id],
    queryFn: () => {
      if (!currentQueryParams.id) {
        navigate(routePaths.home.children.feed.url);
        return;
      }
      return ProjectService.getProjectById(currentQueryParams.id);
    },
  });
  return queryValues;
};
