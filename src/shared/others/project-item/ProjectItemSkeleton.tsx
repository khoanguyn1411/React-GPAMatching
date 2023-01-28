import { Description, PersonAdd } from "@mui/icons-material";
import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { appColors } from "@/theme/mui-theme";

import { AvatarWithInfo } from "../avatar-with-info/AvatarWithInfo";
import { ProjectButton } from "../project-button/ProjectButton";

export const ProjectItemSkeleton: FC = () => {
  return (
    <Stack
      spacing={2}
      divider={<Divider />}
      bgcolor="white"
      paddingY={3}
      border={`1.5px solid ${appColors.borderPrimary}`}
      borderRadius="8px"
    >
      <Stack
        sx={{ paddingX: 2.5 }}
        direction="row"
        justifyContent="space-between"
        spacing={1}
        alignItems="center"
      >
        <AvatarWithInfo avatarUrl={""} name={"Nguyen Van A"} university={"Dai hoc kinh te"} />

        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="circular" width={210} height={118} />
      </Stack>
      <Stack sx={{ all: "unset", cursor: "pointer", paddingX: 2.5 }} spacing={1.5}>
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
          máy Dự án Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp blockchain vào quản
          lý nhà máy Dự án
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
  );
};
