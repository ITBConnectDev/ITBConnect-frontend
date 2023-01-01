import { IAuthUser } from "@/types/auth";
import request from "./request";

export async function register(data: {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  fullname: string;
}) {
  return await request("/auth/register", "POST", data);
}

export async function login(data: { email: string; password: string }) {
  return await request("/auth/login", "POST", data);
}

export async function logout() {
  return await request("/auth/logout", "POST");
}

export async function getAuthUser() {
  return await request<IAuthUser | undefined>("/auth");
}
