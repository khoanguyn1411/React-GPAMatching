import { RouteObject, useRoutes } from "react-router-dom";

import { authRoutes } from "@/features/auth/routes";
import { useAuthInfo } from "@/features/auth/useAuthInfo";
import { homeRoutes } from "@/features/home/routes";
import { informationRoutes } from "@/features/information/routes";
import { notFoundRoutes } from "@/features/not-found/routes";
import { AuthorizedGuard } from "@/guards/auth-guards/AuthorizedGuard";
import { UnauthorizedGuard } from "@/guards/auth-guards/UnauthorizedGuard";

export const RootRoutes: React.FC = () => {
  const { isLoggedIn } = useAuthInfo();
  const routes: RouteObject[] = [
    {
      element: <AuthorizedGuard isLoggedIn={isLoggedIn} />,
      children: [...informationRoutes, ...homeRoutes],
    },
    {
      element: <UnauthorizedGuard isLoggedIn={isLoggedIn} />,
      children: [...authRoutes],
    },
    { children: [...notFoundRoutes] },
  ];
  return useRoutes(routes);
};
