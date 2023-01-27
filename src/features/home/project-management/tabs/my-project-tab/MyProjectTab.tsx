import { Delete, Edit } from "@mui/icons-material";
import { Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { ProjectDetail } from "@/shared/others/project-detail/ProjectDetail";
import { appColors } from "@/theme/mui-theme";
import { AppReact } from "@/utils/types/react";

import { MyRequestsSection } from "./components/MyRequestsSection";

const Wrapper: AppReact.FC.Children = ({ children }) => {
  return (
    <Stack
      spacing={2}
      component="section"
      padding={3}
      bgcolor="white"
      border={"1.5px solid rgba(170, 164, 164, 0.1)"}
    >
      {children}
    </Stack>
  );
};

export const MyProjectTab: FC = () => {
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
                <Button startIcon={<Delete />} color="inherit">
                  Xóa dự án
                </Button>
                <Button startIcon={<Edit />}>Chỉnh sửa</Button>
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
    </Container>
  );
};
