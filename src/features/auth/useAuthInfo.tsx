import { useAtom } from "jotai";

import { currentUserAtom, isAuthPendingAtom, isLoggedInAtom } from "./useAuth";

export const useAuthInfo = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const [isPending] = useAtom(isAuthPendingAtom);
  return {
    isLoggedIn,
    currentUser,
    isPending,
  };
};
