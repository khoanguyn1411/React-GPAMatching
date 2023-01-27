import { User } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useState } from "react";

import { firebaseAuth } from "@/firebase/firebase-config";

const currentUserAtom = atom<null | User>(null);
const isLoggedInAtom = atom<boolean>(true);

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isPending, setIsPending] = useState<boolean>(true);
  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      const timeoutId = setTimeout(() => {
        setIsPending(false);
        setIsLoggedIn(false);
        setCurrentUser(null);
        return;
      }, 10000);
      setIsPending(false);
      setIsLoggedIn(!!user);
      setCurrentUser(user);
      clearTimeout(timeoutId);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isPending,
    isLoggedIn: true,
    currentUser,
  };
};
