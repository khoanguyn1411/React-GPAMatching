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

// Add new module route path here.
const appRoutePaths = {
  ...loginRoutePaths,
};

export const routePaths = {
  ...baseRoutePaths,
  ...appRoutePaths,
};
