import LinearProgress from "@mui/material/LinearProgress";

import { AppReact } from "@/utils/types/react";

export const CustomRoute: AppReact.FC.Children = ({ children }) => {
  return (
    <>
      {<LinearProgress />}
      {children}
    </>
  );
};
