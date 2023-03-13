import request from "./request";

export function deleteCompetition(id: number) {
  return request("/competition/" + id, "DELETE");
}

export function addCompetition(competition: any) {
  return request("/competition", "POST", competition);
}

export function editCompetition(id: number, competition: any) {
  return request("/competition/" + id, "PUT", competition);
}

export function deleteEvent(id: number) {
  return request("/news/" + id, "DELETE");
}

export function addEvent(event: any) {
  return request("/news", "POST", event);
}

export function editEvent(id: number, event: any) {
  return request("/news/" + id, "PUT", event);
}
