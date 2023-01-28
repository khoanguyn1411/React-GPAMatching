import { ArrowRight, Description, PersonAdd, Star, WatchLater } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";

import { isRouteLoadingAtom } from "@/provider/RouterProvider";
import { AvatarWithInfo } from "@/shared/others/avatar-with-info/AvatarWithInfo";
import { MemberList } from "@/shared/others/member-list/MemberList";
import { ProjectItem } from "@/shared/others/project-item/ProjectItem";
import { SectionCardWrapper } from "@/shared/others/section-card-wrapper/SectionCardWrapper";
import { useScrollToTop } from "@/utils/hooks/useScrollToTop";

export const ProjectDetail: FC = () => {
  useScrollToTop();
  const [, setIsRouteLoading] = useAtom(isRouteLoadingAtom);
  useEffect(() => {
    setIsRouteLoading(false);
  }, [setIsRouteLoading]);

  return (
    <Stack gap={2}>
      <Typography variant="h1">Dự án tích hợp blockchain vào quản lý nhà máy</Typography>
      <Grid container spacing={2} component="section">
        <Grid item xs={4}>
          <SectionCardWrapper isFullHeight>
            <Stack spacing={2.3}>
              <Typography variant="h3">Thành viên hiện tại:</Typography>
              <MemberList
                list={[
                  { id: 1, avatarUrl: "", isLeader: true, fullName: "Khoa Nguyen" },
                  { id: 2, avatarUrl: "", isLeader: false, fullName: "Khoa Nguyen" },
                  { id: 3, avatarUrl: "", isLeader: false, fullName: "Khoa Nguyen" },
                  { id: 4, avatarUrl: "", isLeader: false, fullName: "Khoa Nguyen" },
                ]}
              />
              <Stack spacing={2}>
                <Typography variant="h3">Nhóm trưởng:</Typography>
                <AvatarWithInfo
                  avatarUrl={""}
                  name={"Nguyen Thi B"}
                  university={"Dai hoc Bo doi"}
                />
              </Stack>
              <Stack spacing={1} direction="row">
                <PersonAdd />
                <Typography fontWeight={700} component="span">
                  Thành viên cần tuyển: <Typography component="span">3</Typography>
                </Typography>
              </Stack>

              <Stack spacing={1} direction="row">
                <Description />
                <Typography fontWeight={700} component="span">
                  Lĩnh vực: <Typography component="span">Khoa học - Công nghệ</Typography>
                </Typography>
              </Stack>

              <Stack spacing={1} direction="row">
                <WatchLater />
                <Typography fontWeight={700} component="span">
                  Giai đoạn phát triển:{" "}
                  <Typography component="span">
                    Đã hoàn thiện và đưa sản phẩm ra thị trường
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </SectionCardWrapper>
        </Grid>

        <Grid item xs={8}>
          <SectionCardWrapper isFullHeight>
            <Stack spacing={1}>
              <Typography variant="h3">Mô tả dự án:</Typography>
              <Typography textAlign="justify">
                Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp blockchain vào quản lý
                nhà máy Dự án tích hợp bloc Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích
                hợp blockchain vào quản lý nhà máy Dự án tích hợp bloc Dự án tích hợp blockchain vào
                quản lý nhà máy Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp bloc Dự
                án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp blockchain vào quản lý nhà
                máy Dự án tích hợp bloc Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp
                blockchain vào quản lý nhà máy Dự án tích hợp bloc
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Star />
                <Typography variant="h3">Kỹ năng yêu cầu: </Typography>
              </Stack>
              <Stack marginY={1} component="ul" spacing={1}>
                <Typography component="li">Lập trình</Typography>
                <Typography component="li">Lập trình</Typography>
                <Typography component="li">Lập trình</Typography>
                <Typography component="li">Lập trình</Typography>
              </Stack>
            </Stack>
            <Button variant="contained" sx={{ alignSelf: "end" }}>
              Tham gia ngay
            </Button>
          </SectionCardWrapper>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="space-between" spacing={2} alignItems="center">
        <Typography variant="h1">Các dự án cùng lĩnh vực</Typography>
        <Button sx={{ fontWeight: 600 }} endIcon={<ArrowRight />}>
          Xem tất cả
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ProjectItem />
        </Grid>

        <Grid item xs={6}>
          <ProjectItem />
        </Grid>
      </Grid>
    </Stack>
  );
};
