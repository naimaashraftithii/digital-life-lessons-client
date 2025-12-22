import { apiFetch } from "./client";

export function getFeaturedLessons() {
  return apiFetch("/lessons/featured");
}

export function getTopContributors() {
  return apiFetch("/stats/top-contributors");
}

export function getMostSavedLessons() {
  return apiFetch("/stats/most-saved");
}
