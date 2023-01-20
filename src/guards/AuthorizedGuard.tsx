import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { routePaths } from "@/routes";

type Props = {
  isLoggedIn: boolean;
};

export const AuthorizedGuard: FC<Props> = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to={routePaths.login.url} replace />;
};
