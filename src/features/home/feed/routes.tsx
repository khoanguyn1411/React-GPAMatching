import { RouteObject } from "react-router-dom";

import { routePaths } from "@/routes";
import { lazyImport } from "@/utils/funcs/lazy-import";

const { FeedContainer } = lazyImport(() => import("./FeedContainer"), "FeedContainer");

export const feedRoutes: RouteObject[] = [
  {
    path: routePaths.home.children.feed.url,
    element: <FeedContainer />,
  },
];
