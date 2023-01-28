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

import { Project } from "@/core/models/project";
import { ProjectDetail } from "@/shared/others/project-detail/ProjectDetail";
import { appColors } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

import { EditProjectDialog } from "./components/EditProjectDialog";
import { MyRequestsSection } from "./components/MyRequestsSection";
import { projectSchema } from "./form/shema";

const Wrapper: AppReact.FC.Children = ({ children }) => {
  return (
    <Stack
      spacing={2}
      component="section"
      padding={3}
      bgcolor="white"
      border={"1.5px solid rgba(170, 164, 164, 0.1)"}
      borderRadius="8px"
    >
      {children}
    </Stack>
  );
};

export const MyProjectTab: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);

  const projectFormProps = useForm<Project>({
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
          <Wrapper>
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
          </Wrapper>
        </Grid>
        <Grid item xs={4}>
          <Wrapper>
            <MyRequestsSection />
          </Wrapper>
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
