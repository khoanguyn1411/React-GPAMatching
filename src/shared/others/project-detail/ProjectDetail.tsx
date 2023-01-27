import { Article, People, Star, WatchLater } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { AppReact } from "@/utils/types/react";

import { AvatarWithInfo } from "../avatar-with-info/AvatarWithInfo";
import { MemberList } from "../member-list/MemberList";

type Props = {
  title: string;
  prefix: ReactNode;
};

const FieldStack: AppReact.FC.PropsWithChildren<Props> = ({ title, prefix, children }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography component="span">{prefix}</Typography>
      <Typography component="span" fontWeight={700}>
        {title}:{" "}
        <Typography component="span" fontWeight="normal">
          {children}
        </Typography>
      </Typography>
    </Stack>
  );
};

export const ProjectDetail: FC = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h2">Dự án tích hợp blockchain vào quản lý nhà máy</Typography>
      <Typography>
        Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp blockchain vào quản lý nhà máy
        Dự án tích hợp bloc Dự án tích hợp blockchain vào quản lý nhà máy Dự án tích hợp blockchain
        vào quản lý nhà máy Dự án tích hợp bloc Dự án tích hợp blockchain vào quản lý nhà máy Dự án
        tích hợp blockchain vào.
      </Typography>
      <FieldStack title="Lĩnh vực" prefix={<Article />}>
        Khoa học - Công nghệ
      </FieldStack>
      <FieldStack title="Trạng thái" prefix={<WatchLater />}>
        Đã hoàn thiện nhưng chưa có sản phẩm đưa ra thị trường
      </FieldStack>
      <FieldStack title="Thành viên cần tuyển" prefix={<People />}>
        3
      </FieldStack>
      <Box>
        <FieldStack title="Kỹ năng yêu cầu" prefix={<Star />} />
        <Stack marginY={1} component="ul" spacing={1}>
          <Typography component="li">Lập trình</Typography>
          <Typography component="li">Lập trình</Typography>
          <Typography component="li">Lập trình</Typography>
          <Typography component="li">Lập trình</Typography>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1.5}>
          <Typography component="span" fontWeight={700}>
            Thành viên hiện tại:
          </Typography>
          <MemberList
            list={[
              { id: 1, avatarUrl: "", isLeader: true },
              { id: 2, avatarUrl: "", isLeader: false },
            ]}
          />
        </Stack>
        <Stack spacing={1.5}>
          <Typography component="span" fontWeight={700}>
            Nhóm trưởng:
          </Typography>
          <AvatarWithInfo
            avatarUrl={""}
            name={"Khoa"}
            university={"truong dai hoc kinh te luat - DHQG TPHCM"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
