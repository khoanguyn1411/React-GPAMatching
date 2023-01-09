import React from "react";
import { BrowserRouter } from "react-router-dom";

import { CustomRoute } from "@/routes";
import { AppReact } from "@/utils/types/react";

export const RouterProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>
        <CustomRoute>{children}</CustomRoute>
      </BrowserRouter>
    </React.Suspense>
  );
};
