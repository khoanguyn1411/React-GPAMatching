import { PublishTwoTone } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";
import { useLocation } from "react-router-dom";

import { InformationGPALogo } from "@/features/information/components/information-gpa-logo/InformationGPALogo";
import { appColors, appPadding, appShadows } from "@/theme/mui-theme";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";

import { homeLinks } from "../home-links";
import { UserDropdownMenu } from "./UserDropdownMenu";

export const Header: FC = () => {
  const { navigate } = useNavigateWithTransition();
  const { pathname } = useLocation();
  const handleSwitchPage = (url: string) => () => {
    navigate(url);
  };

  return (
    <Stack
      bgcolor={"white"}
      boxShadow={appShadows.main}
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
          <Stack direction="row" alignItems="center" spacing={1}>
            <InformationGPALogo />
            <Typography component="span" fontWeight={600}>
              Matching System
            </Typography>
          </Stack>
          <Stack component="nav" direction="row" justifyContent="space-between" spacing={2}>
            {homeLinks.map((link) => (
              <Button
                key={link.routePath.path}
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  bgcolor: pathname.includes(link.routePath.path) ? appColors.primaryLight : null,
                  color: pathname.includes(link.routePath.path)
                    ? appColors.primary
                    : appColors.textPrimary,
                }}
                onClick={handleSwitchPage(link.routePath.url)}
              >
                {link.name}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button
              sx={{ height: "fit-content" }}
              variant="contained"
              startIcon={<PublishTwoTone />}
            >
              Đăng ý tưởng
            </Button>
            <UserDropdownMenu />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
