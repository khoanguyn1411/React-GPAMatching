import { atom, useAtom } from "jotai";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { LinearLoading } from "@/shared/components/loading/LinearLoading";
import { AppReact } from "@/utils/types/react";

export const isRouteLoadingAtom = atom<boolean>(false);

export const RouterProvider: AppReact.FC.Children = ({ children }) => {
  const [isRouteLoading] = useAtom(isRouteLoadingAtom);
  return (
    <Suspense fallback={<LinearLoading />}>
      {isRouteLoading && <LinearLoading />}
      {<BrowserRouter>{children}</BrowserRouter>}
    </Suspense>
  );
};
