import { routePaths } from "@/routes";
import { RoutePathBaseReturned } from "@/routes/build-route-paths";

export type HomeLink = {
  name: string;
  routePath: RoutePathBaseReturned;
};

const { feed, project } = routePaths.home.children;

export const homeLinks: HomeLink[] = [
  {
    name: "Trang chủ",
    routePath: feed,
  },
  {
    name: "Quản lý dự án",
    routePath: project,
  },
];
