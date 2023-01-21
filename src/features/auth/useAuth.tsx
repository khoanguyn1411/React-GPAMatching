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
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user);
      setIsPending(false);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isPending,
    isLoggedIn,
    currentUser,
  };
};
