import { Navigate, Outlet } from "react-router-dom";

import { APP_DEFAULT_ROUTE_URL } from "@/routes";

type TProps = {
  isLoggedIn: boolean;
};

export const UnauthorizedGuard: React.FC<TProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to={APP_DEFAULT_ROUTE_URL} replace />;
};
