import { GoogleAuthProvider, User } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import { firebaseAuth } from "@/firebase/firebase-config";
import { UserService } from "@/services/userService";
import { useNotify } from "@/utils/hooks/useNotify";

export const currentUserAtom = atom<null | User>(null);
export const isLoggedInAtom = atom<boolean>(true);
export const isAuthPendingAtom = atom<boolean>(false);

export const useAuth = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [, setIsPending] = useAtom(isAuthPendingAtom);
  const { notify } = useNotify();
  const handleLoginFailed = () => {
    setIsPending(false);
    setIsLoggedIn(false);
    setCurrentUser(null);
  };
  const notifyLoginFailed = () => notify({ message: "Đăng nhập thất bại!", variant: "error" });
  const notifyLoginSuccess = () => notify({ message: "Đăng nhập thành công!", variant: "success" });
  const signIn = async (user: User | null) => {
    const firebaseToken = await user?.getIdToken();
    if (firebaseToken == null) {
      handleLoginFailed();
      return;
    }
    const googleCredential = GoogleAuthProvider.credential(firebaseToken);
    if (googleCredential == null || googleCredential.idToken == null) {
      handleLoginFailed();
      notifyLoginFailed();
      return;
    }

    const userSecret = await UserService.getUserSecret({ idToken: googleCredential.idToken });
    if (userSecret instanceof Error) {
      handleLoginFailed();
      notifyLoginFailed();
      return;
    }
    UserService.saveSecret(userSecret);
    const timeoutId = setTimeout(() => {
      handleLoginFailed();
    }, 10000);

    setIsPending(false);
    setIsLoggedIn(!!user);
    setCurrentUser(user);
    clearTimeout(timeoutId);
    notifyLoginSuccess();
  };

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(async (user) => {
      const existedSecret = UserService.getSecret();
      if (existedSecret != null) {
        setIsPending(false);
        setIsLoggedIn(!!user);
        setCurrentUser(user);
        return;
      }
      await signIn(user);
      return;
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
