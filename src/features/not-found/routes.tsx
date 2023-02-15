import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { NotFoundContainer } = lazyImport(
  () => import("@/features/not-found/NotFoundContainer"),
  "NotFoundContainer",
);

export const notFoundRoutes: RouteObject[] = [
  {
    path: routePaths.rest.path,
    element: <NotFoundContainer />,
  },
];
