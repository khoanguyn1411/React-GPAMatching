import { Description, PersonAdd } from "@mui/icons-material";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { AvatarWithInfo } from "@/shared/others/avatar-with-info/AvatarWithInfo";
import { appColors } from "@/theme/mui-theme";

import { ProjectButton } from "../project-button/ProjectButton";

export const ProjectItem: FC = () => {
  return (
    <Card sx={{ paddingY: 2.5 }}>
      <Stack spacing={2} divider={<Divider />}>
        <Stack
          sx={{ paddingX: 2.5 }}
          direction="row"
          justifyContent="space-between"
          spacing={1}
          alignItems="center"
        >
          <AvatarWithInfo avatarUrl={""} name={"Nguyen Van A"} university={"Dai hoc kinh te"} />

          <Box
            borderRadius="8px"
            padding="2px 7px"
            color={appColors.warning}
            fontWeight={500}
            bgcolor={appColors.warningLight}
            border={`1.5px solid ${appColors.warning}`}
          >
            Đang phát triển
          </Box>
        </Stack>
        <Stack sx={{ paddingX: 2.5 }} spacing={1.5}>
          <Typography component="a" fontSize={"18px"} fontWeight={700}>
            Dự án tích hợp blockchain vào quản lý nhà máy
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
            textAlign="justify"
          >
            Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp blockchain vào quản lý nhà
            máy Dự án Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp blockchain vào
            quản lý nhà máy Dự án
          </Typography>
          <Stack>
            <Stack spacing={2}>
              <Stack spacing={1} direction="row">
                <Description />
                <Typography component="span">
                  Lĩnh vực:{" "}
                  <Typography component="span" sx={{ color: appColors.textPrimaryLight }}>
                    Khoa học - Công nghệ
                  </Typography>
                </Typography>
              </Stack>

              <Stack spacing={1} direction="row">
                <PersonAdd />
                <Typography component="span">
                  Thành viên cần tuyển:{" "}
                  <Typography component="span" sx={{ color: appColors.textPrimaryLight }}>
                    3
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{ paddingX: 2.5 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="em" color={appColors.textPrimaryLight}>
            15:00 27/01/2023
          </Typography>
          <ProjectButton type="cancel" />
        </Stack>
      </Stack>
    </Card>
  );
};
