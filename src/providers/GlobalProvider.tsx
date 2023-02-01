import { useProfileQuery } from "@/features/auth/useProfileQuery";
import { useInformationCheck } from "@/features/information/useInformationCheck";
import { AppReact } from "@/utils/types/react";

/** Add check for global state here. */
export const GlobalProvider: AppReact.FC.Children = ({ children }) => {
  useProfileQuery();
  useInformationCheck();
  return <>{children}</>;
};
