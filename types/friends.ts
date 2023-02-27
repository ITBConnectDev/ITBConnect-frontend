import { IProfileUser } from "./profile";

export interface IAllFriends {
  friends: IProfileUser[];
  pageTotal: number;
}
