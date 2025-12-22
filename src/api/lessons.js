import { apiFetch } from "./client";

export function createLesson(lesson) {
  return apiFetch("/lessons", { method: "POST", body: JSON.stringify(lesson) });
}

export function getMyLessons(uid) {
  return apiFetch(`/lessons/my?uid=${uid}`);
}

export function getPublicLessons(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/lessons/public${qs ? `?${qs}` : ""}`);
}

export function getLessonById(id) {
  return apiFetch(`/lessons/${id}`);
}

export function toggleLike(lessonId, uid) {
  return apiFetch(`/lessons/${lessonId}/like`, {
    method: "PATCH",
    body: JSON.stringify({ uid }),
  });
}

export function getFavoritesCount(lessonId) {
  return apiFetch(`/lessons/${lessonId}/favorites-count`);
}

export function getSimilarLessons(lessonId) {
  return apiFetch(`/lessons/similar/${lessonId}`);
}
