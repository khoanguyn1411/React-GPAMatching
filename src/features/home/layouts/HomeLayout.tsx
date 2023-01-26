import { Stack } from "@mui/system";
import { FC } from "react";
import { Outlet } from "react-router-dom";

import { appColors } from "@/theme/mui-theme";

import { Header } from "./Header";
import { Main } from "./Main";

export const HomeLayout: FC = () => {
  return (
    <Stack sx={{ bgcolor: appColors.backgroundBlur, minHeight: "100vh" }}>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Stack>
  );
};
