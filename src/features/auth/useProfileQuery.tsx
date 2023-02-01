import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { currentUserAtom } from "@/providers/AuthProvider";
import { ProfileService } from "@/services/profileService";
import { QUERY_KEY } from "@/store/key";

// For catching and storing data.
export const useProfileQuery = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useQuery({
    enabled: currentUser != null,
    queryKey: [QUERY_KEY.PROFILE],
    queryFn: () => ProfileService.getPersonal(),
    onSuccess: (data) => {
      setCurrentUser((prev) => ({
        ...prev,
        ...data,
        email: currentUser?.email ?? "",
        avatarUrl: currentUser?.avatarUrl ?? "",
      }));
    },
  });
};
