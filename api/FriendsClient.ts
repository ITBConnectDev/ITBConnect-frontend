import { IAllFriends } from "@/types/friends";
import { IAchievement, IProfileUser } from "@/types/profile";
import request from "./request";

export async function getFriendProfile(id: number, headers?: any) {
  return await request<IProfileUser>(
    `/friends/${id}`,
    "GET",
    undefined,
    headers
  );
}

export async function getAllFriend(headers?: any) {
  return await request<IAllFriends>(`/friends/all`, "GET", undefined, headers);
}

export async function getFilteredFriend(query: string, headers?: any) {
  return await request<IAllFriends>(
    `/friends/?name=${query}`,
    "GET",
    undefined,
    headers
  );
}
