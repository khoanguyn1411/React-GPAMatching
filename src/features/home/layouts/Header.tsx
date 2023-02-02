import { yupResolver } from "@hookform/resolvers/yup";
import { PublishTwoTone } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { ProjectCreation } from "@/core/models/project";
import { useAuth } from "@/features/auth/useAuth";
import { InformationGPALogo } from "@/features/information/components/information-gpa-logo/InformationGPALogo";
import { routePaths } from "@/routes";
import { appColors, appPadding, appShadows } from "@/theme/mui-theme";
import { CompareURL } from "@/utils/funcs/compare-url";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";
import { AppReact } from "@/utils/types/react";

import { homeLinks } from "../home-links";
import { EditProjectDialog } from "../project-management/tabs/my-project-tab/components/EditProjectDialog";
import { projectSchema } from "../project-management/tabs/my-project-tab/form/shema";
import { UserDropdownMenu } from "./UserDropdownMenu";

type Props = {
  shouldBorderBottom?: boolean;
};

export const Header: AppReact.FC.PropsWithChildren<Props> = ({ shouldBorderBottom = false }) => {
  const { navigate } = useNavigateWithTransition();
  const { pathname } = useLocation();
  const { currentUser } = useAuth();
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);
  const handleSwitchPage = (url: string) => () => {
    navigate(url);
  };

  const projectFormProps = useForm<ProjectCreation>({
    resolver: yupResolver(projectSchema("project")),
    shouldUnregister: true,
  });

  const handleNavigateToHome = () => {
    navigate(routePaths.home.children.feed.url);
  };

  const handleOpenEditDialog = () => {
    setIsOpenEditDialog(true);
  };

  return (
    <Stack
      bgcolor={"white"}
      boxShadow={!shouldBorderBottom ? appShadows.main : undefined}
      borderBottom={shouldBorderBottom ? 1.5 : undefined}
      borderColor={shouldBorderBottom ? "divider" : undefined}
      position="sticky"
      zIndex={999}
      top={0}
      width="100%"
      component="header"
    >
      <Container>
        <Stack
          padding={appPadding.layout}
          direction="row"
          justifyContent="space-between"
          spacing={2}
          alignItems="center"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={handleNavigateToHome}
          >
            <InformationGPALogo />
            <Typography component="span" fontWeight={600}>
              Matching System
            </Typography>
          </Stack>
          <Stack component="nav" direction="row" justifyContent="space-between" spacing={2}>
            {homeLinks.map((link, index) => {
              const isLinkActive = CompareURL.isInclude(link.routePath.path, pathname);
              return (
                <Button
                  key={`${link.routePath.path}-${index}`}
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    bgcolor: isLinkActive ? appColors.primaryLight : null,
                    color: isLinkActive ? appColors.primary : appColors.textPrimary,
                  }}
                  onClick={handleSwitchPage(link.routePath.url)}
                >
                  {link.name}
                </Button>
              );
            })}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            {!currentUser?.hasCreatedProject && (
              <Button
                onClick={handleOpenEditDialog}
                sx={{ height: "fit-content" }}
                variant="contained"
                startIcon={<PublishTwoTone />}
              >
                Đăng ý tưởng
              </Button>
            )}
            <UserDropdownMenu />
          </Stack>
        </Stack>
      </Container>

      <EditProjectDialog
        mode="create"
        formProps={projectFormProps}
        isOpenEditDialog={isOpenEditDialog}
        setIsOpenEditDialog={setIsOpenEditDialog}
      />
    </Stack>
  );
};
