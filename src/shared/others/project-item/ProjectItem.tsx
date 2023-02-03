import { Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { icons } from "@/assets/icons";
import { Project } from "@/core/models/project";
import { ProjectField } from "@/core/models/project-field";
import { ProjectStatus } from "@/core/models/project-status";
import { routePaths } from "@/routes";
import { AvatarWithInfo } from "@/shared/others/avatar-with-info/AvatarWithInfo";
import { appColors } from "@/theme/mui-theme";
import { DateUtils } from "@/utils/funcs/date-utils";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";

import { ProjectButton } from "../project-button/ProjectButton";

const { UserGroupIcon, FileIcon } = icons;

type Props = {
  data: Project;
  invalidateQueryKeys: string[];
};

export const ProjectItem: FC<Props> = ({ data, invalidateQueryKeys }) => {
  const { id, status, name, description, field, findingMemberQuantity, createdAt, team } = data;
  const { navigate } = useNavigateWithTransition();
  const getStatusStyle = () => {
    if (status === ProjectStatus.FinishedButNoProduct) {
      return {
        main: appColors.info,
        bg: appColors.infoLight,
      };
    }
    if (status === ProjectStatus.NotFinished) {
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

  const shouldShowStatus = status !== ProjectStatus.Other;
  return (
    <Stack
      divider={<Divider />}
      bgcolor="white"
      paddingY={2}
      height={"100%"}
      spacing={2}
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
        {team.leader && <AvatarWithInfo data={team.leader} />}
        {shouldShowStatus && (
          <Typography
            borderRadius="8px"
            padding="2px 7px"
            component="span"
            noWrap
            sx={{ maxWidth: 180 }}
            title={ProjectStatus.toReadable(status)}
            color={getStatusStyle().main}
            fontWeight={500}
            bgcolor={getStatusStyle().bg}
            border={`1.5px solid ${getStatusStyle().main}`}
          >
            {ProjectStatus.toReadable(status)}
          </Typography>
        )}
      </Stack>

      <Stack
        sx={{
          all: "unset",
          cursor: "pointer",
          ":hover a": { color: appColors.primary, transition: "0.3s ease" },
          paddingX: 2.5,
          height: "calc(100% - 60px)",
        }}
        spacing={1.5}
        onClick={handleNavigateToDetailProjectPage}
      >
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
          component="a"
          fontSize={"18px"}
          title={name}
          fontWeight={600}
        >
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
              <FileIcon />
              <Typography component="span">
                Lĩnh vực:{" "}
                <Typography component="span" sx={{ color: appColors.textPrimaryLight }}>
                  {ProjectField.toReadable(field)}
                </Typography>
              </Typography>
            </Stack>

            <Stack spacing={1} direction="row" alignItems="center">
              <UserGroupIcon />
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
        <ProjectButton invalidateQueryKeys={invalidateQueryKeys} project={data} />
      </Stack>
    </Stack>
  );
};
