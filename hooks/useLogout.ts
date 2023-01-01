import { logout } from "@/api/AuthClient";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      queryClient.setQueryData("authUser", undefined);
      router.push("/login");
    },
  });
  return mutate;
}
