import { IAuthUser } from "@/types/auth";
import request from "./request";

export async function register(data: {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  fullname: string;
  NIM: string;
}) {
  return await request("/auth/register", "POST", data);
}

export async function login(data: { email: string; password: string }) {
  return await request("/auth/login", "POST", data);
}

export async function logout() {
  return await request("/auth/logout", "POST");
}

export async function getAuthUser(headers?: any) {
  return await request<IAuthUser | undefined>(
    "/auth",
    "GET",
    undefined,
    headers
  );
}

export async function getMajors() {
  return await fetch("/majors.json").then((res) => res.json());
}
