export interface ICompetition {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  url: string;
  organizer: string;
  organizerDescription: string;
  photoURLs: {
    id: number;
    url: string;
  }[];
  competitionTags: {
    id: number;
    tag: string;
  }[];
  instagramURL: string;
}
