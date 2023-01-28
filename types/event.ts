export interface IEvent {
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
  instagramURL: string;
}
