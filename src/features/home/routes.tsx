import { Navigate, RouteObject } from "react-router-dom";

import { InformationGuard } from "@/guards/information-guards/InformationGuard";
import { routePaths } from "@/routes";

import { accountManagementRoutes } from "./account-management/routes";
import { feedRoutes } from "./feed/routes";
import { HomeLayout } from "./layouts/HomeLayout";
import { HomeLayoutWithTabs } from "./layouts/HomeLayoutWithTabs";
import { projectDetailRoutes } from "./project-detail/routes";
import { projectManagementRoutes } from "./project-management/routes";

export const homeRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to={routePaths.home.url} replace />,
  },
  {
    path: routePaths.home.path,
    element: <InformationGuard />,
    children: [
      {
        // path: routePaths.root.url,
        element: <HomeLayout />,
        children: [...feedRoutes, ...accountManagementRoutes, ...projectDetailRoutes],
      },
      {
        // path: routePaths.root.url,
        element: <HomeLayoutWithTabs />,
        children: [...projectManagementRoutes],
      },
    ],
  },
];
