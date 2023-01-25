import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { routePaths } from "@/routes";
import { compareUrl } from "@/utils/funcs/compare-url";

type Props = {
  isLoggedIn: boolean;
};

export const AuthorizedGuard: FC<Props> = ({ isLoggedIn }) => {
  const location = useLocation();
  if (isLoggedIn) {
    if (compareUrl(routePaths.root.url, location.pathname)) {
      return <Navigate to={routePaths.home.url} replace />;
    }
    return <Outlet />;
  }
  return <Navigate to={routePaths.login.url} replace />;
};
