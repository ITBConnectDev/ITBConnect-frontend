import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { ReactNode } from "react";

function AdminOrRedirect({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  if (isLoading) return null;
  if (user && user.isAdmin) return <>{children}</>;
  router.push("/");
  return null;
}

export default AdminOrRedirect;
