import { RouteObject, useRoutes } from "react-router-dom";

import { authRoutes } from "@/features/auth/login-routes";
import { notFoundRoutes } from "@/shared/layouts/not-found-container/not-found-routes";

export const RootRoutes: React.FC = () => {
  const routes: RouteObject[] = [...notFoundRoutes, ...authRoutes];
  return useRoutes(routes);
};
