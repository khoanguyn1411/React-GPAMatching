import { useMutation } from "@tanstack/react-query";

import { ProfileService } from "@/services/profileService";
import { ProjectService } from "@/services/projectService";
import { useNotify } from "@/utils/hooks/useNotify";

export const useIdeaQuery = () => {
  const { notify } = useNotify();

  const notifyError = () => notify({ message: "Khởi tạo thông tin thất bại", variant: "error" });
  const notifySuccess = () =>
    notify({ message: "Khởi tạo thông tin thành công", variant: "success" });

  const profileQuery = useMutation(ProfileService.updateProfile, {
    onError: () => {
      notifyError();
      return;
    },
    onSuccess: () => {
      notifySuccess();
      return;
    },
  });

  const projectQuery = useMutation(ProjectService.createProject, {
    onError: () => {
      notifyError();
      return;
    },
    onSuccess: () => {
      notifySuccess();
      return;
    },
  });
  return {
    profileQuery,
    projectQuery,
  };
};
