import { User } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { useState } from "react";

const currentUserAtom = atom<null | User>(null);
const isLoggedInAtom = atom<boolean>(true);

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isPending, setIsPending] = useState<boolean>(false);
  return {
    isPending,
    isLoggedIn,
    currentUser,
  };
};
