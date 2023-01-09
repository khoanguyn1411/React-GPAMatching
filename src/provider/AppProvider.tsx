import { AppReact } from "@/utils/types/react";

import { MediaContextProvider } from "./MediaContextProvider";
import { RouterProvider } from "./RouterProvider";
import { ToastProvider } from "./ToastProvider";

export const AppProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <ToastProvider>
      <MediaContextProvider>
        <RouterProvider>{children}</RouterProvider>
      </MediaContextProvider>
    </ToastProvider>
  );
};
