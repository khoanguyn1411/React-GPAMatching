import { OAuthCredential, User } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { User as UserProfile } from "@/core/models/user";
import { firebaseAuth } from "@/firebase/firebase-config";
import { ProfileService } from "@/services/profileService";
import { UserService } from "@/services/userService";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { useNotify } from "@/utils/hooks/useNotify";
import { AppReact } from "@/utils/types/react";

export const currentUserAtom = atom<null | UserProfile>(null);
export const isLoggedInAtom = atom<boolean>(true);
export const isAuthPendingAtom = atom<boolean>(true);
export const oauthCredentialAtom = atom<OAuthCredential | null>(null);

export const getUserFullName = (userProfile: UserProfile, user: User | null) => {
  if (!userProfile.fullName) {
    return user?.displayName ?? "";
  }
  return userProfile.fullName;
};

export const getUserAvatarUrl = (userProfile: UserProfile, user: User | null) => {
  if (!userProfile.avatarUrl) {
    return user?.photoURL ?? "";
  }
  return userProfile.avatarUrl;
};

export const AuthProvider: AppReact.FC.Children = ({ children }) => {
  const isAlreadyGetMe = useRef(false);
  const timeOutId = useRef<NodeJS.Timeout>();

  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [oauthCredential] = useAtom(oauthCredentialAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [isPending, setIsPending] = useAtom(isAuthPendingAtom);

  const { notify } = useNotify();
  const notifyLoginFailed = () => notify({ message: "Đăng nhập thất bại!", variant: "error" });
  const notifyLoginSuccess = () => notify({ message: "Đăng nhập thành công!", variant: "success" });

  const handleLoginFailed = async () => {
    UserService.signOut();
    setIsPending(false);
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleAfterFirebaseValidation = async (user: User | null) => {
    const userProfile = await ProfileService.getPersonalWithError();
    if (userProfile instanceof Error) {
      handleLoginFailed();
      return;
    }
    setCurrentUser({
      ...userProfile,
      fullName: getUserFullName(userProfile, user),
      avatarUrl: getUserAvatarUrl(userProfile, user),
      email: user?.email ?? "",
    });
    setIsPending(false);
    setIsLoggedIn(true);
  };

  const signIn = async (user: User | null) => {
    if (user == null) {
      handleLoginFailed();
      isAlreadyGetMe.current = false;
      return;
    }

    if (isAlreadyGetMe.current) {
      isAlreadyGetMe.current = false;
      return;
    }

    if (oauthCredential == null || oauthCredential.idToken == null) {
      return;
    }
    const userSecret = await UserService.getUserSecret({
      idToken: oauthCredential.idToken,
    });
    if (userSecret instanceof Error) {
      handleLoginFailed();
      notifyLoginFailed();
      return;
    }
    await UserService.saveSecret(userSecret);
    isAlreadyGetMe.current = true;
    await handleAfterFirebaseValidation(user);
    notifyLoginSuccess();
  };

  useEffect(() => {
    timeOutId.current = setTimeout(() => {
      setIsPending(false);
      handleLoginFailed();
    }, 10000);
    if (!isPending) {
      clearTimeout(timeOutId.current);
    }
    return () => clearTimeout(timeOutId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(async (user) => {
      const existedSecret = await UserService.getSecret();
      if (existedSecret != null && user != null && !isAlreadyGetMe.current) {
        await handleAfterFirebaseValidation(user);
        return;
      }
      if (isAlreadyGetMe.current && user == null) {
        handleLoginFailed();
        return;
      }
      signIn(user);
      return;
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oauthCredential]);
  return <>{isPending ? <CircleLoading /> : <>{children}</>}</>;
};
