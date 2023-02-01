import { yupResolver } from "@hookform/resolvers/yup";
import { Delete, Edit, QuestionMark } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { ProjectCreation } from "@/core/models/project";
import { ProjectDetail } from "@/shared/others/project-detail/ProjectDetail";
import { SectionCardWrapper } from "@/shared/others/section-card-wrapper/SectionCardWrapper";
import { appColors } from "@/theme/mui-theme";

import { EditProjectDialog } from "./components/EditProjectDialog";
import { MyRequestsSection } from "./components/MyRequestsSection";
import { projectSchema } from "./form/shema";

export const MyProjectTab: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);

  const projectFormProps = useForm<ProjectCreation>({
    resolver: yupResolver(projectSchema("project")),
    shouldUnregister: true,
  });

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleDeleteProject = () => {
    console.log("Delete here");
  };

  const handleOpenEditDialog = () => {
    setIsOpenEditDialog(true);
  };

  return (
    <Container component="section">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <SectionCardWrapper>
            <ProjectDetail />
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography component="em" color={appColors.textPrimaryLight}>
                Đăng tải: 15:00 27/01/2023
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Button onClick={handleOpenModal} startIcon={<Delete />} color="inherit">
                  Xóa dự án
                </Button>
                <Button onClick={handleOpenEditDialog} startIcon={<Edit />}>
                  Chỉnh sửa
                </Button>
              </Stack>
            </Stack>
          </SectionCardWrapper>
        </Grid>
        <Grid item xs={4}>
          <SectionCardWrapper>
            {/* TODO: Add information for this component. */}
            <MyRequestsSection projectId="123" requesterList={[]} />
          </SectionCardWrapper>
        </Grid>
      </Grid>

      <EditProjectDialog
        mode="edit"
        formProps={projectFormProps}
        isOpenEditDialog={isOpenEditDialog}
        setIsOpenEditDialog={setIsOpenEditDialog}
      />

      <Dialog
        open={isOpenModal}
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
          <Button color="error" variant="contained" onClick={handleDeleteProject}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
