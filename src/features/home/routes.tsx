import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { HomeContainer } = lazyImport(() => import("./HomeContainer"), "HomeContainer");

export const homeRoutes: RouteObject[] = [
  {
    path: routePaths.root.url,
    element: <HomeContainer />,
  },
];
