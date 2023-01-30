import { useAtom } from "jotai";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { isAlreadyFilledInformationFormAtom } from "@/features/information/information-atoms";
import { routePaths } from "@/routes";

export const NonInformationGuard: FC = () => {
  const [isAlreadyFilledInformation] = useAtom(isAlreadyFilledInformationFormAtom);
  if (!isAlreadyFilledInformation) {
    return <Outlet />;
  }
  return <Navigate to={routePaths.home.children.feed.url} replace />;
};
