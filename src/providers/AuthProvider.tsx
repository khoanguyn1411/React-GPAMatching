import { GoogleAuthProvider, User } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { UserProfile } from "@/core/models/user";
import { firebaseAuth } from "@/firebase/firebase-config";
import { ProfileService } from "@/services/profileService";
import { UserService } from "@/services/userService";
import { useNotify } from "@/utils/hooks/useNotify";
import { AppReact } from "@/utils/types/react";

export const currentUserAtom = atom<null | UserProfile>(null);
export const isLoggedInAtom = atom<boolean>(true);
export const isAuthPendingAtom = atom<boolean>(true);

const TIMEOUT = 10000;

export const AuthProvider: AppReact.FC.Children = ({ children }) => {
  const isAlreadyGetMe = useRef(false);

  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [, setIsPending] = useAtom(isAuthPendingAtom);
  const { notify } = useNotify();
  const notifyLoginFailed = () => notify({ message: "Đăng nhập thất bại!", variant: "error" });
  const notifyLoginSuccess = () => notify({ message: "Đăng nhập thành công!", variant: "success" });

  const handleLoginFailed = async () => {
    await UserService.signOut();
    setIsPending(false);
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleAfterFirebaseValidation = async (user: User | null) => {
    const timeoutId = setTimeout(() => {
      handleLoginFailed();
      notifyLoginFailed();
    }, TIMEOUT);
    const userProfile = await ProfileService.getPersonal();
    if (userProfile instanceof Error) {
      handleLoginFailed();
      clearTimeout(timeoutId);
      return;
    }
    setIsPending(false);
    setIsLoggedIn(true);
    clearTimeout(timeoutId);
    const getUserFullName = () => {
      if (!userProfile.fullName) {
        return user?.displayName ?? "";
      }
      return userProfile.fullName;
    };
    setCurrentUser({
      ...userProfile,
      fullName: getUserFullName(),
      avatarUrl: user?.photoURL ?? "",
      email: user?.email ?? "",
    });
  };

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

    if (isAlreadyGetMe.current) {
      isAlreadyGetMe.current = false;
      return;
    }

    const userSecret = await UserService.getUserSecret({ idToken: googleCredential.idToken });
    if (userSecret instanceof Error) {
      handleLoginFailed();
      notifyLoginFailed();
      return;
    }
    await UserService.saveSecret(userSecret);
    const timeoutId = setTimeout(() => {
      handleLoginFailed();
    }, TIMEOUT);
    isAlreadyGetMe.current = true;
    handleAfterFirebaseValidation(user).then(() => {
      clearTimeout(timeoutId);
      notifyLoginSuccess();
    });
  };
  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(async (user) => {
      const existedSecret = await UserService.getSecret();
      if (existedSecret != null && user != null && !isAlreadyGetMe.current) {
        await handleAfterFirebaseValidation(user);
        return;
      }
      await signIn(user);
      return;
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return <>{children}</>;
};
