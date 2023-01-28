import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { ProjectDetailContainer } = lazyImport(
  () => import("./ProjectDetailContainer"),
  "ProjectDetailContainer",
);

export const projectDetailRoutes: RouteObject[] = [
  {
    path: routePaths.home.children.projectDetail.path,
    children: [
      {
        path: routePaths.home.children.projectDetail.children.id.path,
        element: <ProjectDetailContainer />,
      },
    ],
  },
];
