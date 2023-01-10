import { RouteObject, useRoutes } from "react-router-dom";

export const RootRoutes: React.FC = () => {
  const routes: RouteObject[] = [
    {
      element: <div>Your element here</div>,
    },
  ];

  return useRoutes(routes);
};
