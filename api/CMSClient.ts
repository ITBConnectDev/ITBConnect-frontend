import request from "./request";

export function deleteCompetition(id: number) {
  return request("/competitions/" + id, "DELETE");
}
