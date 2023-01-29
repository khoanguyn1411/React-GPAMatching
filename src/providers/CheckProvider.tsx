import { useAtom } from "jotai";
import { useEffect } from "react";

import { useAuth } from "@/features/auth/useAuth";
import { isAlreadyFilledInformationFormAtom } from "@/features/information/information-atoms";
import { AppReact } from "@/utils/types/react";

/** Add check for global state here. */
export const CheckProvider: AppReact.FC.Children = ({ children }) => {
  const { currentUser } = useAuth();
  const [, setIsAlreadyFilledInformation] = useAtom(isAlreadyFilledInformationFormAtom);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setIsAlreadyFilledInformation(currentUser?.isFilledInformation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return <>{children}</>;
};
