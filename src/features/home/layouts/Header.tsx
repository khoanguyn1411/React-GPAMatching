import { ArrowDropDown, PublishTwoTone } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "@/features/auth/useAuth";
import { InformationGPALogo } from "@/features/information/components/information-gpa-logo/InformationGPALogo";
import { firebaseAuth } from "@/firebase/firebase-config";
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

  const handleCloseMenu = (menu: HomeMenu | null) => () => {
    setAnchorEl(null);
    if (menu === null) {
      return;
    }
    if (menu.key === "logout") {
      firebaseAuth.signOut();
      return;
    }
    if (menu.routePath) {
      navigate(menu.routePath?.url ?? "");
    }
  };
  return (
    <Stack
      component="header"
      padding={"15px"}
      boxShadow=""
      direction="row"
      justifyContent="space-between"
      spacing={2}
      alignItems="center"
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <InformationGPALogo />
        <Typography fontWeight={600}>Matching System</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        {homeLinks.map((link) => (
          <Typography
            key={link.routePath.path}
            sx={{
              fontWeight: pathname.includes(link.routePath.path) ? 700 : 600,
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Button sx={{ height: "fit-content" }} variant="contained" startIcon={<PublishTwoTone />}>
          Đăng ý tưởng
        </Button>
        <Button
          disableRipple
          sx={{
            height: "fit-content",
            padding: 0,
            "&:hover": {
              background: "none",
            },
          }}
          onClick={handleOpenMenu}
          id="home-menu-button"
          aria-controls={isMenuOpen ? "home-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? "true" : undefined}
        >
          <Avatar sx={{ width: 40, height: 40 }} src={currentUser?.photoURL ?? ""} />
          <ArrowDropDown sx={{ color: appColors.textPrimary }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          id="home-menu"
          open={isMenuOpen}
          onClose={handleCloseMenu(null)}
          MenuListProps={{
            "aria-labelledby": "home-menu-button",
          }}
        >
          {homeMenus.map((menu, index) => (
            <MenuItem
              sx={{
                bgcolor: menu.routePath?.url === pathname ? appColors.primaryLight : null,
              }}
              key={index}
              onClick={handleCloseMenu(menu)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
};
