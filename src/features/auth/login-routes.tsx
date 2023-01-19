import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { LoginContainer } = lazyImport(() => import("./LoginContainer"), "LoginContainer");

export const authRoutes: RouteObject[] = [
  {
    path: routePaths.login.url,
    element: <LoginContainer />,
  },
];
