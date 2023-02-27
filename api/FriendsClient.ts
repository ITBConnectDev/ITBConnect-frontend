import { IAchievement, IProfileUser } from "@/types/profile";
import request from "./request";

export async function getFriendProfile(id: number, headers?: any) {
  return await request<any>(`/friends/${id}`, "GET", undefined, headers);
}

export async function getAllFriend(headers?: any) {
  return await request<any>(`/friends/all`, "GET", undefined, headers);
}
