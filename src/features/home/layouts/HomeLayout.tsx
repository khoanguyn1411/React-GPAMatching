import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Main } from "./Main";

export const HomeLayout: FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};
