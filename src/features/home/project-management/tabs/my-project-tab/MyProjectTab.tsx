import { yupResolver } from "@hookform/resolvers/yup";
import { Delete, Edit } from "@mui/icons-material";
import { Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ProjectCreation } from "@/core/models/project";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { ProjectDetail } from "@/shared/others/project-detail/ProjectDetail";
import { SectionCardWrapper } from "@/shared/others/section-card-wrapper/SectionCardWrapper";
import { appColors } from "@/theme/mui-theme";
import { DateUtils } from "@/utils/funcs/date-utils";

import { useProjectManagement } from "../../useProjectManagementQuery";
import { DeleteProjectDialog } from "./components/DeleteProjectDialog";
import { EditProjectDialog } from "./components/EditProjectDialog";
import { MyFollowersSection } from "./components/MyFollowersSection";
import { projectSchema } from "./form/shema";

export const MyProjectTab: FC = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);

  const projectInfo = useProjectManagement();

  const projectFormProps = useForm<ProjectCreation>({
    resolver: yupResolver(projectSchema("project")),
    shouldUnregister: true,
    defaultValues: projectInfo?.data?.ownedProject ?? undefined,
  });

  useEffect(() => {
    projectFormProps.reset(projectInfo?.data?.ownedProject ?? undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectInfo?.data]);

  const handleOpenEditDialog = () => {
    setIsOpenEditDialog(true);
  };

  const handleOpenModal = () => {
    setIsOpenDeleteModal(true);
  };

  if (projectInfo?.isLoading) {
    return <CircleLoading />;
  }

  if (projectInfo == null || projectInfo.data == null || projectInfo.isError) {
    return (
      <Container>
        <Typography>Không lấy được thông tin dự án</Typography>
      </Container>
    );
  }

  if (projectInfo.data.ownedProject == null) {
    return (
      <Container>
        <Typography>Bạn chưa tạo dự án</Typography>
      </Container>
    );
  }

  return (
    <Container component="section">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <SectionCardWrapper>
            <ProjectDetail project={projectInfo.data.ownedProject} />
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography component="em" color={appColors.textPrimaryLight}>
                Đăng tải: {DateUtils.toFormat(projectInfo.data.ownedProject.createdAt, "VN")}
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
            <MyFollowersSection
              projectId={projectInfo.data.ownedProject.id}
              followerList={projectInfo.data.ownedProject.followers}
            />
          </SectionCardWrapper>
        </Grid>
      </Grid>

      <EditProjectDialog
        mode="edit"
        formProps={projectFormProps}
        isOpenEditDialog={isOpenEditDialog}
        setIsOpenEditDialog={setIsOpenEditDialog}
      />
      <DeleteProjectDialog isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal} />
    </Container>
  );
};
