import { useAtom } from "jotai";
import { useEffect, useTransition } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

import { isRouteLoadingAtom } from "@/providers/RouterProvider";

/**
 * Navigate to route with top progress bar animation.
 * @returns Custom navigate to trigger such animation. same usage with navigate from `useNavigate` React hook
 */
export const useNavigateWithTransition = () => {
  const [isPending, startTransition] = useTransition();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setIsRouteLoading] = useAtom(isRouteLoadingAtom);
  const rootNavigate = useNavigate();

  const navigate = (path: To, options?: NavigateOptions) => {
    setIsRouteLoading(true);
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
