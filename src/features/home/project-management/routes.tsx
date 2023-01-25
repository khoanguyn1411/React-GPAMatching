import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { ProjectManagementContainer } = lazyImport(
  () => import("./ProjectManagementContainer"),
  "ProjectManagementContainer",
);

export const projectManagementRoutes: RouteObject[] = [
  {
    path: routePaths.home.children.project.url,
    element: <ProjectManagementContainer />,
  },
];
