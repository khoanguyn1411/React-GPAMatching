import { Button, ButtonProps } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";

import { InterestAction } from "@/core/models/interest-action";
import { Project } from "@/core/models/project";
import { useAuth } from "@/features/auth/useAuth";
import { ProjectService } from "@/services/projectService";
import { QUERY_KEY } from "@/store/key";

interface Props extends ButtonProps {
  project: Project;
  invalidateQueryKeys: string[];
}

type ButtonType = "cancel" | "join" | "out" | "disable";

export const ProjectButton: FC<Props> = ({ project, invalidateQueryKeys, ...otherProps }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const shouldHideJoinButton = project.team.leader?.id === currentUser?.id;

  const getButtonType = (): ButtonType => {
    if (currentUser == null) {
      return "disable";
    }
    const shouldReturnOutType =
      project.followers.includes(currentUser.id) || project.team.members.includes(currentUser.id);

    if (shouldReturnOutType) {
      return "out";
    }
    if (!currentUser.isAllowedToJoin) {
      return "disable";
    }
    if (currentUser.teamIds.length > 3) {
      return "disable";
    }
    return "join";
  };
  const [buttonType, setButtonType] = useState<ButtonType>(() => getButtonType());

  const { mutate } = useMutation({
    mutationFn: ProjectService.performUserAction,
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries(invalidateQueryKeys);
      queryClient.invalidateQueries([QUERY_KEY.PROFILE]);
      if (variable.action === InterestAction.Interested) {
        setButtonType("cancel");
        return;
      }
      if (variable.action === InterestAction.Uninterested) {
        setButtonType("join");
        return;
      }
    },
  });

  const getButtonText = () => {
    if (buttonType === "cancel") {
      return "Hủy yêu cầu";
    }
    if (buttonType === "join" || buttonType === "disable") {
      return "Tham gia";
    }
    return "Thoát dự án";
  };

  const handleClick = () => {
    if (currentUser == null) {
      return;
    }
    mutate({
      projectId: project.id,
      userId: currentUser.id,
      action: buttonType === "cancel" ? InterestAction.Uninterested : InterestAction.Interested,
    });
  };

  if (shouldHideJoinButton) {
    return <></>;
  }
  return (
    <Button
      variant={buttonType !== "cancel" ? "contained" : "outlined"}
      color={buttonType !== "out" ? "primary" : "error"}
      disabled={buttonType === "disable"}
      onClick={handleClick}
      {...otherProps}
    >
      {getButtonText()}
    </Button>
  );
};
