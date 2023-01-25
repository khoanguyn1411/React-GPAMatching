import { routePaths } from "@/routes";
import { RoutePathBaseReturned } from "@/routes/build-route-paths";

const { account } = routePaths.home.children;

export type HomeMenu = {
  key: "account" | "logout";
  name: string;
  routePath?: RoutePathBaseReturned;
};

export const homeMenus: HomeMenu[] = [
  {
    key: "account",
    name: "Quản lý tài khoản",
    routePath: account,
  },
  {
    key: "logout",
    name: "Đăng xuất",
  },
];
