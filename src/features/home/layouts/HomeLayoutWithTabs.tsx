import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Main } from "./Main";

export const HomeLayoutWithTabs: FC = () => {
  return (
    <Box>
      <Header shouldBorderBottom />
      <Main shouldNotPadding>
        <Outlet />
      </Main>
    </Box>
  );
};
