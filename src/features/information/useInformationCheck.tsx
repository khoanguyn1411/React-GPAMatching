import { useAtom } from "jotai";
import { useEffect } from "react";

import { useAuth } from "../auth/useAuth";
import { isAlreadyFilledInformationFormAtom } from "./information-atoms";

export const useInformationCheck = () => {
  const { currentUser } = useAuth();
  const [, setIsAlreadyFilledInformation] = useAtom(isAlreadyFilledInformationFormAtom);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setIsAlreadyFilledInformation(currentUser.isFilledInformation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
};
