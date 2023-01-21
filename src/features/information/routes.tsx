import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { InformationContainer } = lazyImport(
  () => import("./InformationContainer"),
  "InformationContainer",
);

export const informationRoutes: RouteObject[] = [
  {
    path: routePaths.information.url,
    element: <InformationContainer />,
  },
];
