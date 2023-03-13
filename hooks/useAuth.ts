import { getAuthUser } from "@/api/AuthClient";
import { useQuery } from "react-query";

export default function useAuth() {
  const { data: user, ...rest } = useQuery("authUser", getAuthUser, {
    staleTime: 30000,
  });
  return { user, ...rest };
}
