import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Main } from "./Main";

export const HomeLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};
