import { Description, PersonAdd } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { Project } from "@/core/models/project";
import { ProjectField } from "@/core/models/project-field";
import { ProjectStatus } from "@/core/models/project-status";
import { routePaths } from "@/routes";
import { AvatarWithInfo } from "@/shared/others/avatar-with-info/AvatarWithInfo";
import { appColors } from "@/theme/mui-theme";
import { DateUtils } from "@/utils/funcs/date-utils";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";

import { ProjectButton } from "../project-button/ProjectButton";

type Props = Project;

export const ProjectItem: FC<Props> = ({
  id,
  status,
  name,
  description,
  field,
  findingMemberQuantity,
  createdAt,
  team,
}) => {
  const { navigate } = useNavigateWithTransition();

  const getStatusStyle = () => {
    if (status === ProjectStatus.NotFinished || status === ProjectStatus.Other) {
      return {
        main: appColors.warning,
        bg: appColors.warningLight,
      };
    }
    return {
      main: appColors.success,
      bg: appColors.successLight,
    };
  };
  const handleNavigateToDetailProjectPage = () => {
    navigate({ pathname: routePaths.home.children.projectDetail.url, search: `id=${id}` });
  };
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
        <AvatarWithInfo data={team.leader} />

        <Typography
          borderRadius="8px"
          padding="2px 7px"
          component="span"
          noWrap
          sx={{ maxWidth: 220 }}
          title={ProjectStatus.toReadable(status)}
          color={getStatusStyle().main}
          fontWeight={500}
          bgcolor={getStatusStyle().bg}
          border={`1.5px solid ${getStatusStyle().main}`}
        >
          {ProjectStatus.toReadable(status)}
        </Typography>
      </Stack>
      <Stack
        sx={{ all: "unset", cursor: "pointer", paddingX: 2.5 }}
        spacing={1.5}
        onClick={handleNavigateToDetailProjectPage}
        component="button"
      >
        <Typography component="a" fontSize={"18px"} fontWeight={700}>
          {name}
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
          {description}
        </Typography>
        <Stack>
          <Stack spacing={2}>
            <Stack spacing={1} direction="row">
              <Description />
              <Typography component="span">
                Lĩnh vực:{" "}
                <Typography component="span" sx={{ color: appColors.textPrimaryLight }}>
                  {ProjectField.toReadable(field)}
                </Typography>
              </Typography>
            </Stack>

            <Stack spacing={1} direction="row">
              <PersonAdd />
              <Typography component="span">
                Thành viên cần tuyển:{" "}
                <Typography component="span" sx={{ color: appColors.textPrimaryLight }}>
                  {findingMemberQuantity}
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
          {DateUtils.toFormat(createdAt, "VN")}
        </Typography>
        <ProjectButton type="cancel" />
      </Stack>
    </Stack>
  );
};
