import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AppReact } from "@/utils/types/react";

export const RouterProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>
        <LinearProgress
          variant="indeterminate"
          sx={{ position: "fixed", height: "2.5px", top: 0, width: "100%", zIndex: 9999 }}
        />
        {children}
      </BrowserRouter>
    </React.Suspense>
  );
};
