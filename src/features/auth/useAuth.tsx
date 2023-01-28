import { useAtom } from "jotai";

import { currentUserAtom, isAuthPendingAtom, isLoggedInAtom } from "@/provider/AuthProvider";

export const useAuth = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const [isPending] = useAtom(isAuthPendingAtom);
  return {
    isLoggedIn,
    currentUser,
    isPending,
  };
};
