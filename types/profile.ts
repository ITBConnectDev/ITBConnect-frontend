export interface IProfileUser {
  id: number;
  email: string;
  nickname: string;
  fullname: string;
  major: string;
  year: number;
  nim: string;
  photo: {
    id: number;
    url: string;
  } | null;
  profile: {
    id: number;
    bio: string;
    instagramURL: string;
    linkedinURL: string;
    phoneNumber: string;
  } | null;
  userInterests: Array<{
    id: number;
    interest: string;
  }>;
  userLanguages: Array<{
    id: number;
    language: string;
  }>;
}

export interface IAchievement {
  id: number;
  achievement: string;
  issuer: string;
  date: string;
  description: string;
}
