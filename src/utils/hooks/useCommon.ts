import { useScrollToTop } from "./useScrollToTop";
import { useStopLoadingRoute } from "./useStopLoadingRoute";

export const useCommon = (): void => {
  useScrollToTop();
  useStopLoadingRoute();
};
