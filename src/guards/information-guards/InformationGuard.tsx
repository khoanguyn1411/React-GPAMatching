import { useAtom } from "jotai";
import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isAlreadyFilledInformationFormAtom } from "@/features/information/information-atoms";
import { routePaths } from "@/routes";
import { CompareURL } from "@/utils/funcs/compare-url";

export const InformationGuard: FC = () => {
  const location = useLocation();
  const [isAlreadyFilledInformation] = useAtom(isAlreadyFilledInformationFormAtom);
  if (isAlreadyFilledInformation) {
    if (CompareURL.isMatched(routePaths.home.url, location.pathname)) {
      return <Navigate to={routePaths.home.children.feed.url} replace />;
    }
    return <Outlet />;
  }
  return <Navigate to={routePaths.information.url} replace />;
};
