import { useAtom } from "jotai";
import { useEffect } from "react";

import { isRouteLoadingAtom } from "@/providers/RouterProvider";

export const useStopLoadingRoute = (): void => {
  const [isRouteLoading, setIsRouteLoading] = useAtom(isRouteLoadingAtom);
  useEffect(() => {
    if (!isRouteLoading) {
      return;
    }
    setIsRouteLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
