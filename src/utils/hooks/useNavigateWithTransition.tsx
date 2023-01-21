import { useAtom } from "jotai";
import { useEffect, useTransition } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

import { isRouteLoadingAtom } from "@/provider/RouterProvider";

/**
 * Navigate to route with top progress bar animation.
 * @returns Custom navigate to trigger such animation. same usage with navigate from `useNavigate` React hook
 */
export const useNavigateWithTransition = () => {
  const [isPending, startTransition] = useTransition();
  const [_, setIsRouteLoading] = useAtom(isRouteLoadingAtom);
  const rootNavigate = useNavigate();

  const navigate = (path: string, options?: NavigateOptions) => {
    startTransition(() => rootNavigate(path, options));
  };

  // Trigger loading animation of top progress bar.
  useEffect(() => {
    setIsRouteLoading(isPending);
  }, [isPending, setIsRouteLoading]);

  return {
    navigate,
  };
};
