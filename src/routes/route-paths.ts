import { buildRoutePaths } from "./build-route-paths";

const baseRoutePaths = buildRoutePaths({
  root: {
    path: "",
    title: "Trang chủ",
  },
  rest: {
    path: "*",
    title: "Không tìm thấy",
  },
} as const);

const loginRoutePaths = buildRoutePaths({
  login: { path: "login", title: "Đăng nhập" },
} as const);
const informationRoutePaths = buildRoutePaths({
  information: { path: "information" },
});

// Add new module route path here.
const appRoutePaths = {
  ...loginRoutePaths,
  ...informationRoutePaths,
};

export const routePaths = {
  ...baseRoutePaths,
  ...appRoutePaths,
};

export const APP_DEFAULT_ROUTE_URL = routePaths.information.url;
