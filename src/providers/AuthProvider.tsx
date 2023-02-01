import { useQuery } from "@tanstack/react-query";
import { OAuthCredential, User } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { User as UserProfile } from "@/core/models/user";
import { firebaseAuth } from "@/firebase/firebase-config";
import { ProfileService } from "@/services/profileService";
import { UserService } from "@/services/userService";
import { CircleLoading } from "@/shared/components/loading/CircleLoading";
import { QUERY_KEY } from "@/store/key";
import { useNotify } from "@/utils/hooks/useNotify";
import { AppReact } from "@/utils/types/react";

export const currentUserAtom = atom<null | UserProfile>(null);
export const isLoggedInAtom = atom<boolean>(true);
export const isAuthPendingAtom = atom<boolean>(true);
export const oauthCredentialAtom = atom<OAuthCredential | null>(null);

const TIMEOUT = 8000;

const getUserFullName = (userProfile: UserProfile, user: User | null) => {
  if (!userProfile.fullName) {
    return user?.displayName ?? "";
  }
  return userProfile.fullName;
};

const getUserAvatarUrl = (userProfile: UserProfile, user: User | null) => {
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
  const [queryConfig, setQueryConfig] = useState<{
    user: User | null;
    callback?: () => void;
  } | null>(null);

  const notifyLoginFailed = () => notify({ message: "Đăng nhập thất bại!", variant: "error" });
  const notifyLoginSuccess = () => notify({ message: "Đăng nhập thành công!", variant: "success" });

  const handleLoginFailed = async () => {
    await UserService.signOut();
    setIsPending(false);
    setIsLoggedIn(false);
    setCurrentUser(null);
    setQueryConfig(null);
  };

  const handleLoginSuccess = () => {
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
    const timeoutId = setTimeout(() => {
      handleLoginFailed();
    }, TIMEOUT);
    isAlreadyGetMe.current = true;
    setQueryConfig({
      user,
      callback: () => {
        clearTimeout(timeoutId);
      },
    });
  };

  useQuery({
    enabled: queryConfig != null,
    queryKey: [QUERY_KEY.PROFILE],
    queryFn: () => ProfileService.getPersonal(),
    onSuccess: (data) => {
      if (queryConfig == null) {
        return;
      }
      setCurrentUser({
        ...data,
        fullName: getUserFullName(data, queryConfig.user),
        avatarUrl: getUserAvatarUrl(data, queryConfig.user),
        email: queryConfig.user?.email ?? "",
      });
      isAlreadyGetMe.current = true;
      if (queryConfig.callback) {
        notifyLoginSuccess();
      }
      handleLoginSuccess();
      queryConfig.callback?.();
    },
    onError: () => {
      handleLoginFailed();
      return;
    },
  });

  useEffect(() => {
    timeOutId.current = setTimeout(() => {
      setIsPending(false);
      handleLoginFailed();
    }, TIMEOUT);
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
        setQueryConfig({ user });
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
