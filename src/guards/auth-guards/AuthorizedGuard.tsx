import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { routePaths } from "@/routes";
import { CompareURL } from "@/utils/funcs/compare-url";

type Props = {
  isLoggedIn: boolean;
};

export const AuthorizedGuard: FC<Props> = ({ isLoggedIn }) => {
  const location = useLocation();
  if (isLoggedIn) {
    if (CompareURL.isMatched(routePaths.root.url, location.pathname)) {
      return <Navigate to={routePaths.home.url} replace />;
    }
    return <Outlet />;
  }
  return <Navigate to={routePaths.login.url} replace />;
};
