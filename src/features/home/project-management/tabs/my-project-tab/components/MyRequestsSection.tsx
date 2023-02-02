import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

import { InterestAction } from "@/core/models/interest-action";
import { Project } from "@/core/models/project";
import { UserShort } from "@/core/models/user";
import { ProjectService } from "@/services/projectService";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { QUERY_KEY } from "@/store/key";
import { useNotify } from "@/utils/hooks/useNotify";

import { RequestItem } from "./RequestItem";

type Props = {
  requesterList: readonly UserShort[];
  projectId: Project["id"];
};

export const MyRequestsSection: FC<Props> = ({ requesterList, projectId }) => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();
  const { isLoading, mutate } = useMutation({
    mutationFn: ProjectService.performUserAction,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.PROJECT_BY_USER]);
    },
    onError: (_, variables) => {
      const actionMessage =
        variables.action === InterestAction.Approve ? "Thêm thành viên" : "Xóa người quan tâm";
      notify({ message: `${actionMessage} thất bại`, variant: "error" });
    },
  });
  const handleApproveRequester = (user: UserShort) => {
    mutate({ userId: user.id, projectId: projectId, action: InterestAction.Approve });
  };

  const handleRejectRequester = (user: UserShort) => {
    mutate({ userId: user.id, projectId: projectId, action: InterestAction.Decline });
  };

  const hasRequest = requesterList.length > 0;
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Yêu cầu xin vào nhóm</Typography>
      <Stack spacing={4} position="relative">
        <Typography component="span" sx={{ display: !hasRequest ? "inline" : "none" }}>
          Bạn không có yêu cầu nào.
        </Typography>
        {isLoading && (
          <Stack
            position={"absolute"}
            left={0}
            top={25}
            bottom={0}
            right={0}
            justifyContent="center"
          >
            <CircleLoading mode="normal" />
          </Stack>
        )}
        {requesterList.map((user, index) => (
          <RequestItem
            onApproved={handleApproveRequester}
            onRejected={handleRejectRequester}
            key={`${user.id}-${index}`}
            user={user}
          />
        ))}
      </Stack>
    </Stack>
  );
};
