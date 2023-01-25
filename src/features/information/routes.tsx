import { RouteObject } from "react-router-dom";

import { NonInformationGuard } from "@/guards/information-guards/NonInformationGuard";
import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { InformationContainer } = lazyImport(
  () => import("./InformationContainer"),
  "InformationContainer",
);

export const informationRoutes: RouteObject[] = [
  {
    path: routePaths.information.path,
    element: <NonInformationGuard />,
    children: [{ path: routePaths.root.path, element: <InformationContainer /> }],
  },
];
