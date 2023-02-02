import { Clear } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

import { ProjectCreation } from "@/core/models/project";
import { ProjectService } from "@/services/projectService";
import { LoadingButton } from "@/shared/components/loading-button/LoadingButton";
import { QUERY_KEY } from "@/store/key";
import { useNotify } from "@/utils/hooks/useNotify";
import { AppReact } from "@/utils/types/react";

import { EditProjectForm } from "../form/EditProjectForm";

type Props = {
  isOpenEditDialog: boolean;
  setIsOpenEditDialog: AppReact.State.Dispatch<boolean>;
  mode: "edit" | "create";
  formProps: UseFormReturn<ProjectCreation>;
};

export const EditProjectDialog: FC<Props> = ({
  mode,
  formProps,
  isOpenEditDialog,
  setIsOpenEditDialog,
}) => {
  const { notify } = useNotify();
  const {
    handleSubmit,
    formState: { isDirty },
  } = formProps;

  const queryClient = useQueryClient();

  const createProject = useMutation({
    mutationFn: ProjectService.createProject,
    onSuccess: (newProject) => {
      notify({ message: "Đăng tải dự án thành công.", variant: "success" });
      setIsOpenEditDialog(false);
      queryClient.invalidateQueries([QUERY_KEY.PROJECT_BY_USER]);
      queryClient.invalidateQueries([QUERY_KEY.PROJECT]);
      queryClient.invalidateQueries([QUERY_KEY.PROFILE]);
      queryClient.setQueryData([QUERY_KEY.PROJECT, newProject.id], newProject);
    },
    onError: () => notify({ message: "Đăng tải dự án thất bại.", variant: "error" }),
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleCloseModal = () => {
    setIsOpenEditDialog(false);
  };

  const handleDispatchClickEvent = () => {
    if (!buttonRef.current) {
      return;
    }
    buttonRef.current.click();
  };

  const handleEditProject = (editData: ProjectCreation) => {
    if (mode === "create") {
      createProject.mutate(editData);
      return;
    }
  };

  return (
    <Dialog
      open={isOpenEditDialog}
      maxWidth="md"
      onClose={handleCloseModal}
      aria-labelledby="edit-project-dialog-title"
      aria-describedby="edit-project-dialog-description"
    >
      <DialogTitle
        fontWeight={600}
        color="primary"
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        gap={1}
      >
        {mode === "create" ? "Đăng ý tưởng" : "Chỉnh sửa dự án"}
        <IconButton onClick={handleCloseModal}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit(handleEditProject)}>
          <EditProjectForm mode={mode} shouldHideIsReadyToJoinField formProps={formProps} />
          <button ref={buttonRef} type="submit" hidden />
        </form>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ padding: 2, gap: 1 }}>
        <Button variant="outlined" onClick={handleCloseModal}>
          Hủy
        </Button>
        <LoadingButton
          isLoading={createProject.isLoading}
          variant="contained"
          disabled={!isDirty}
          onClick={handleDispatchClickEvent}
        >
          {mode === "create" ? "Đăng ý tưởng" : "Cập nhật"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
