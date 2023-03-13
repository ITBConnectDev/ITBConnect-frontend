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

export async function addUserAchievement(data: any) {
  return await request("/profile/achievements", "POST", data);
}

export async function updateUserAchievement(id: number, data: any) {
  return await request(`/profile/achievements/${id}`, "PUT", data);
}

export async function deleteUserAchievement(id: number) {
  return await request(`/profile/achievements/${id}`, "DELETE");
}

export async function addUserSkill(data: any) {
  return await request("/profile/skills", "POST", data);
}

export async function deleteUserSkill(skillId: number) {
  return await request(`/profile/skills/${skillId}`, "DELETE");
}

export async function addUserLanguage(data: any) {
  return await request("/profile/languages", "POST", data);
}

export async function deleteUserLanguage(langId: number) {
  return await request(`/profile/languages/${langId}`, "DELETE");
}

export async function uploadPhoto(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  return await request("/upload", "POST", formData);
}
