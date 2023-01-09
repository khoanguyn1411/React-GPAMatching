import TopBarProgress from "react-topbar-progress-indicator";

import { AppReact } from "@/utils/types/react";

TopBarProgress.config({
  barColors: {
    "0": "#40BBD8",
    "1.0": "#007EA4",
  },
  shadowBlur: 5,
});

export const CustomRoute: AppReact.FC.Children = ({ children }) => {
  return (
    <>
      {<TopBarProgress />}
      {children}
    </>
  );
};
