import { ArrowDropDown } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "@/features/auth/useAuth";
import { UserService } from "@/services/userService";
import { appColors } from "@/theme/mui-theme";
import { CompareURL } from "@/utils/funcs/compare-url";
import { useNavigateWithTransition } from "@/utils/hooks/useNavigateWithTransition";

import { HomeMenu, homeMenus } from "../home-menus";

export const UserDropdownMenu: FC = () => {
  const { navigate } = useNavigateWithTransition();
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

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
      UserService.signOut();
      return;
    }
    if (menu.routePath) {
      navigate(menu.routePath?.url ?? "");
    }
  };

  return (
    <>
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
        disableScrollLock={true}
        open={isMenuOpen}
        onClose={handleCloseMenu(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        MenuListProps={{
          "aria-labelledby": "home-menu-button",
        }}
      >
        {homeMenus.map((menu, index) => {
          const isActiveMenu = CompareURL.isInclude(menu.routePath?.path, pathname);
          return (
            <MenuItem
              sx={{
                bgcolor: isActiveMenu ? appColors.primaryLight : null,
                color: isActiveMenu ? appColors.primary : null,
                fontWeight: isActiveMenu ? 600 : null,
              }}
              key={index}
              onClick={handleCloseMenu(menu)}
            >
              {menu.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
