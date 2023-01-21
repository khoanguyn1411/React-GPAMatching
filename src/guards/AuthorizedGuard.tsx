import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { APP_DEFAULT_ROUTE_URL, routePaths } from "@/routes";

type Props = {
  isLoggedIn: boolean;
};

export const AuthorizedGuard: FC<Props> = ({ isLoggedIn }) => {
  const location = useLocation();
  if (isLoggedIn) {
    if (location.pathname === routePaths.root.url) {
      return <Navigate to={APP_DEFAULT_ROUTE_URL} replace />;
    }
    return <Outlet />;
  }
  return <Navigate to={routePaths.login.url} replace />;
};
