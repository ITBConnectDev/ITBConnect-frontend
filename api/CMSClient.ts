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
