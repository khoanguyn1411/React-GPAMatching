import { Outlet, RouteObject } from "react-router-dom";

import { InformationGuard } from "@/guards/information-guards/InformationGuard";
import { routePaths } from "@/routes";

import { accountManagementRoutes } from "./account-management/routes";
import { feedRoutes } from "./feed/routes";
import { HomeLayout } from "./layouts/HomeLayout";
import { projectManagementRoutes } from "./project-management/routes";

export const homeRoutes: RouteObject[] = [
  {
    path: routePaths.root.url,
    element: <Outlet />,
    children: [
      {
        path: routePaths.home.url,
        element: <InformationGuard />,
        children: [
          {
            path: "",
            element: <HomeLayout />,
            children: [...projectManagementRoutes, ...feedRoutes, ...accountManagementRoutes],
          },
        ],
      },
    ],
  },
];
