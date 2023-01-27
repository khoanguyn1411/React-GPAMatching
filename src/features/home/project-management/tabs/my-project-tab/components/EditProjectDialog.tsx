import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";

import { Project } from "@/core/models/project";
import { FormService } from "@/utils/funcs/form-service";
import { AppReact } from "@/utils/types/react";

import { EditProjectForm } from "../form/EditProjectForm";
import { projectSchema } from "../form/shema";

type Props = {
  isOpenEditDialog: boolean;
  setIsOpenEditDialog: AppReact.State.Dispatch<boolean>;
};

export const EditProjectDialog: FC<Props> = ({ isOpenEditDialog, setIsOpenEditDialog }) => {
  const projectFormProps = useForm<Project>({
    resolver: yupResolver(projectSchema("project")),
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    formState: { dirtyFields },
  } = projectFormProps;

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
      <DialogTitle fontWeight={600} color="primary" display="flex" alignItems="center" gap={1}>
        Chỉnh sửa dự án
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit(handleEditProject)}>
          <EditProjectForm shouldHideIsReadyToJoinField formProps={projectFormProps} mode="edit" />
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
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};
