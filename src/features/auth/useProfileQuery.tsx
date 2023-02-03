import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { currentUserAtom } from "@/providers/AuthProvider";
import { ProfileService } from "@/services/profileService";
import { QUERY_KEY } from "@/store/key";

// For catching and storing data.
export const useProfileQuery = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useQuery({
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: currentUser != null,
    queryKey: [QUERY_KEY.PROFILE],
    queryFn: () => ProfileService.getPersonal(),
    onSuccess: (data) => {
      const getAvatarUrl = () => {
        if (!data.avatarUrl) {
          return currentUser?.avatarUrl ?? "";
        }
        return data.avatarUrl;
      };
      const getUserFullName = () => {
        if (!data.fullName) {
          return currentUser?.fullName ?? "";
        }
        return data.fullName;
      };

      setCurrentUser((prev) => ({
        ...prev,
        ...data,
        email: currentUser?.email ?? "",
        fullName: getUserFullName(),
        avatarUrl: getAvatarUrl(),
      }));
    },
  });
};
