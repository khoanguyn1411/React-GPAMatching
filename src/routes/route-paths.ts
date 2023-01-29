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
} as const);
const homeRoutePaths = buildRoutePaths({
  home: {
    path: "home",
    children: {
      feed: { path: "feed" },
      project: {
        path: "project",
        children: {
          myProject: { path: "my-project" },
          joinedProjects: { path: "joined-projects" },
        },
      },
      projectDetail: {
        path: "project-detail",
      },
      account: { path: "account" },
    },
  },
} as const);

// Add new module route path here.
const appRoutePaths = {
  ...loginRoutePaths,
  ...informationRoutePaths,
  ...homeRoutePaths,
};

export const routePaths = {
  ...baseRoutePaths,
  ...appRoutePaths,
};
