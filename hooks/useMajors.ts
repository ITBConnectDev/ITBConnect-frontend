import { getMajors } from "@/api/AuthClient";
import { useQuery } from "react-query";

export default function useMajors(): Record<string, string> {
  const { data } = useQuery("majors", getMajors, {
    staleTime: Infinity,
  });
  return data ?? {};
}
