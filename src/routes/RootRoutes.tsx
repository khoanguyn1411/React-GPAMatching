import { RouteObject, useRoutes } from "react-router-dom";

import { authRoutes } from "@/features/auth/routes";
import { useAuth } from "@/features/auth/useAuth";
import { informationRoutes } from "@/features/information/routes";
import { AuthorizedGuard } from "@/guards/AuthorizedGuard";
import { UnauthorizedGuard } from "@/guards/UnauthorizedGuard";
import { notFoundRoutes } from "@/shared/layouts/not-found-container/not-found-routes";

export const RootRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const routes: RouteObject[] = [
    {
      element: <AuthorizedGuard isLoggedIn={isLoggedIn} />,
      children: [...informationRoutes],
    },
    {
      element: <UnauthorizedGuard isLoggedIn={isLoggedIn} />,
      children: [...authRoutes],
    },
    { children: [...notFoundRoutes] },
  ];
  return useRoutes(routes);
};
