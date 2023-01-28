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
import { FC, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

import { Project } from "@/core/models/project";
import { FormService } from "@/utils/funcs/form-service";
import { AppReact } from "@/utils/types/react";

import { EditProjectForm } from "../form/EditProjectForm";

type Props = {
  isOpenEditDialog: boolean;
  setIsOpenEditDialog: AppReact.State.Dispatch<boolean>;
  mode: "edit" | "create";
  formProps: UseFormReturn<Project>;
};

export const EditProjectDialog: FC<Props> = ({
  mode,
  formProps,
  isOpenEditDialog,
  setIsOpenEditDialog,
}) => {
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = formProps;

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

  const handleEditProject = (edit: Project) => {
    console.log(edit);
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
        <Button
          disabled={!FormService.isDirtyFields(dirtyFields)}
          variant="contained"
          onClick={handleDispatchClickEvent}
        >
          {mode === "create" ? "Đăng ý tưởng" : "Cập nhật"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
