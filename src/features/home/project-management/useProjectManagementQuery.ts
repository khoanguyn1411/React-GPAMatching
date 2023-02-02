import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import { ProjectByUser } from "@/core/models/project-by-user";
import { useAuth } from "@/features/auth/useAuth";
import { ProjectService } from "@/services/projectService";
import { QUERY_KEY } from "@/store/key";

const projectManagementQueryAtom = atom<{
  isLoading: boolean;
  data: ProjectByUser | null;
  isError: boolean;
} | null>(null);

export const useProjectManagementQuery = () => {
  const { currentUser } = useAuth();
  const [, setProjectManagementState] = useAtom(projectManagementQueryAtom);
  const { isError, data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PROJECT_BY_USER],
    queryFn: () => {
      if (currentUser == null) {
        return;
      }
      return ProjectService.getProjectByUser(currentUser.id);
    },
  });
  useEffect(() => {
    setProjectManagementState({ isError, isLoading, data: data ?? null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isLoading, data]);
};

export const useProjectManagement = () => {
  const [data] = useAtom(projectManagementQueryAtom);
  return data;
};
