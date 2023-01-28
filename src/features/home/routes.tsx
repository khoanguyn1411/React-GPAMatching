import { Outlet, RouteObject } from "react-router-dom";

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
    path: routePaths.root.path,
    element: <Outlet />,
    children: [
      {
        path: routePaths.home.path,
        element: <InformationGuard />,
        children: [
          {
            path: routePaths.root.path,
            element: <HomeLayout />,
            children: [...feedRoutes, ...accountManagementRoutes, ...projectDetailRoutes],
          },
          {
            path: routePaths.root.path,
            element: <HomeLayoutWithTabs />,
            children: [...projectManagementRoutes],
          },
        ],
      },
    ],
  },
];
