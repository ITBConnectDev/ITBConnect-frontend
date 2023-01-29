export interface IProfileUser {
  id: number;
  email: string;
  nickname: string;
  fullname: string;
  major: string;
  year: number;
  nim: string;
  photoURL: string | null;
  profile: {
    id: number;
    bio: string;
    instagramURL: string;
    linkedinURL: string;
    phoneNumber: string;
  } | null;
}

export interface IAchievement {
  id: number;
  achievement: string;
  issuer: string;
  date: string;
  description: string;
}
