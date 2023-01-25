import { ArrowDropDown, PublishTwoTone } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "@/features/auth/useAuth";
import { InformationGPALogo } from "@/features/information/components/information-gpa-logo/InformationGPALogo";
import { appColors } from "@/theme/mui-theme";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";

import { homeLinks } from "../home-links";
import { HomeMenu, homeMenus } from "../home-menus";

export const Header: FC = () => {
  const { navigate } = useNavigateWithTransition();
  const { pathname } = useLocation();
  const { currentUser } = useAuth();
  const handleSwitchPage = (url: string) => () => {
    navigate(url);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (menu: HomeMenu) => () => {
    setAnchorEl(null);
    if (menu.key === "logout") {
      return;
    }
    if (menu.routePath) {
      navigate(menu.routePath?.url ?? "");
    }
  };
  return (
    <header>
      <Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <InformationGPALogo />
          <Typography fontWeight={600}>Matching System</Typography>
        </Stack>
        <Stack>
          {homeLinks.map((link) => (
            <Typography
              key={link.routePath.path}
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                color: pathname.includes(link.routePath.path)
                  ? appColors.primary
                  : appColors.textPrimary,
              }}
              component="a"
              onClick={handleSwitchPage(link.routePath.url)}
            >
              {link.name}
            </Typography>
          ))}
        </Stack>
        <Stack>
          <Button variant="contained" startIcon={<PublishTwoTone />}>
            Đăng ý tưởng
          </Button>
          <Button
            onClick={handleOpenMenu}
            id="home-menu-button"
            aria-controls={isMenuOpen ? "home-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
          >
            <Avatar src={currentUser?.photoURL ?? ""} />
            <ArrowDropDown sx={{ color: appColors.textPrimary }} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            id="home-menu"
            open={isMenuOpen}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "home-menu-button",
            }}
          >
            {homeMenus.map((menu, index) => (
              <MenuItem key={index} onClick={handleCloseMenu(menu)}>
                {menu.name}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>
    </header>
  );
};
