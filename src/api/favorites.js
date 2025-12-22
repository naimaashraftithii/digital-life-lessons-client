import { apiFetch } from "./client";

export function toggleFavorite(uid, lessonId) {
  return apiFetch("/favorites/toggle", {
    method: "POST",
    body: JSON.stringify({ uid, lessonId }),
  });
}

export function getFavoriteLessons(uid) {
  return apiFetch(`/favorites/lessons?uid=${uid}`);
}
