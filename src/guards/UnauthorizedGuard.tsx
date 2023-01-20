import { Navigate, Outlet } from "react-router-dom";

import { routePaths } from "@/routes";

type TProps = {
  isLoggedIn: boolean;
};

export const UnauthorizedGuard: React.FC<TProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to={routePaths.information.url} replace />;
};
