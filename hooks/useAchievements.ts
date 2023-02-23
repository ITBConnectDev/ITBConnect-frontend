import { getUserAchievements } from "@/api/ProfileClient";
import { useQuery } from "react-query";

export default function useAchievements(userId?: number, page = 0) {
  return useQuery(
    ["achievements", userId, page],
    () => getUserAchievements(userId!, page),
    {
      enabled: !!userId,
    }
  );
}
