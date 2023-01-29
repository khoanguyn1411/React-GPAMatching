import { useMutation } from "@tanstack/react-query";

import { ProfileService } from "@/services/profileService";
import { useNotify } from "@/utils/hooks/useNotify";
import { AppReact } from "@/utils/types/react";

export const useIdeaQuery = (setIsFilledInfo: AppReact.State.Dispatch<boolean>) => {
  const { notify } = useNotify();
  const query = useMutation(ProfileService.updateProfile, {
    onError: () => {
      notify({ message: "Cập nhật thông tin thất bại", variant: "error" });
      return;
    },
    onSuccess: () => {
      notify({ message: "Cập nhật thông tin thành công", variant: "success" });
      setIsFilledInfo(true);
    },
  });
  return query;
};
