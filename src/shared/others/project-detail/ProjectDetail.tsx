import { Article, People, Star, WatchLater } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { ProjectDetail as ProjectDetailType } from "@/core/models/project";
import { ProjectField } from "@/core/models/project-field";
import { ProjectStatus } from "@/core/models/project-status";
import { Skill } from "@/core/models/skills";
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

type ProjectDetailProps = {
  project: ProjectDetailType;
};

export const ProjectDetail: FC<ProjectDetailProps> = ({ project }) => {
  if (project.team.leader == null) {
    return <Typography>Dữ liệu dự án không tồn tại</Typography>;
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h2">{project.name}</Typography>
      <Typography>{project.description}</Typography>
      <FieldStack title="Lĩnh vực" prefix={<Article />}>
        {ProjectField.toReadable(project.field)}
      </FieldStack>
      <FieldStack title="Trạng thái" prefix={<WatchLater />}>
        {ProjectStatus.toReadable(project.status)}
      </FieldStack>
      <FieldStack title="Thành viên cần tuyển" prefix={<People />}>
        {project.findingMemberQuantity}
      </FieldStack>
      <Box>
        <FieldStack title="Kỹ năng yêu cầu" prefix={<Star />} />
        <Stack direction="row" marginY={1} paddingX={3} component="ul" spacing={1}>
          {project.requiredSkills.map((skill) => (
            <Chip label={Skill.toReadable(skill)} key={`${skill}-index`} component="li" />
          ))}
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1.5}>
          <Typography component="span" fontWeight={700}>
            Thành viên hiện tại:
          </Typography>
          <MemberList list={project.team.members} leaderId={project.team.leader.id} />
        </Stack>
        <Stack spacing={1.5}>
          <Typography component="span" fontWeight={700}>
            Nhóm trưởng:
          </Typography>
          <AvatarWithInfo data={project.team.leader} />
        </Stack>
      </Stack>
    </Stack>
  );
};
