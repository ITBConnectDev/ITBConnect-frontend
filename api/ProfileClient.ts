import { IAchievement, IProfileUser } from "@/types/profile";
import request from "./request";

export async function getUserProfile(userId: number, headers?: any) {
  return await request<IProfileUser>(
    `/profile/${userId}`,
    "GET",
    undefined,
    headers
  );
}

export async function updateUserProfile(data: any) {
  return await request("/profile", "PUT", data);
}

export async function getUserAchievements(userId: number, page = 1) {
  return await request<{
    achievements: Array<IAchievement>;
    page: number;
    pageTotal: number;
  }>(`/profile/${userId}/achievements?page=${page}`, "GET");
}