import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { NotFoundContainer } = lazyImport(
  () => import("@/shared/layouts/not-found-container/NotFoundContainer"),
  "NotFoundContainer",
);

export const notFoundRoutes: RouteObject[] = [
  {
    path: routePaths.rest.url,
    element: <NotFoundContainer />,
  },
];
