import { QuestionMark } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

import { ProjectService } from "@/services/projectService";
import { LoadingButton } from "@/shared/components/loading-button/LoadingButton";
import { QUERY_KEY } from "@/store/key";
import { useNotify } from "@/utils/hooks/useNotify";
import { AppReact } from "@/utils/types/react";

import { useProjectManagement } from "../../../useProjectManagementQuery";

type Props = {
  isOpen: boolean;
  setIsOpen: AppReact.State.Dispatch<boolean>;
};

export const DeleteProjectDialog: FC<Props> = ({ isOpen, setIsOpen }) => {
  const projectInfo = useProjectManagement();
  const queryClient = useQueryClient();
  const { notify } = useNotify();
  const { mutate, isLoading } = useMutation({
    mutationFn: ProjectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.PROFILE]);
      queryClient.invalidateQueries([QUERY_KEY.PROJECT_BY_USER]);
      setIsOpen(false);
      notify({ message: "Xóa dự án thành công", variant: "success" });
    },
    onError: () => {
      notify({ message: "Xóa dự án thất bại", variant: "error" });
    },
  });

  const handleDeleteProject = () => {
    if (projectInfo?.data?.ownedProject == null) {
      return;
    }
    mutate(projectInfo?.data?.ownedProject.id);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="avatar-picker-modal-title"
      aria-describedby="avatar-picker-modal-description"
    >
      <DialogTitle display="flex" alignItems="center" gap={1}>
        <QuestionMark color="error" />
        Xác nhận xóa
      </DialogTitle>
      <DialogContent>
        <Typography component="span">
          Bạn có chắc muốn xóa dự án này? Bạn sẽ không thể hoàn tác khi đã nhấn{" "}
          <Typography color="error" component="span" fontWeight={600}>
            Xác nhận
          </Typography>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button color="error" onClick={handleCloseModal}>
          Hủy
        </Button>
        <LoadingButton
          isLoading={isLoading}
          color="error"
          variant="contained"
          onClick={handleDeleteProject}
        >
          Xác nhận
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
