import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { AccountManagementContainer } = lazyImport(
  () => import("./AccountManagementContainer"),
  "AccountManagementContainer",
);

export const accountManagementRoutes: RouteObject[] = [
  {
    path: routePaths.home.children.account.url,
    element: <AccountManagementContainer />,
  },
];
