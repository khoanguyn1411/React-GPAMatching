import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { ProjectManagementContainer } = lazyImport(
  () => import("./ProjectManagementContainer"),
  "ProjectManagementContainer",
);

export const projectManagementRoutes: RouteObject[] = [
  {
    path: routePaths.home.children.project.path,
    element: <ProjectManagementContainer />,
    children: [
      {
        path: routePaths.home.children.project.children.myProject.path,
        element: <ProjectManagementContainer />,
      },
      {
        path: routePaths.home.children.project.children.joinedProjects.path,
        element: <ProjectManagementContainer />,
      },
    ],
  },
];
