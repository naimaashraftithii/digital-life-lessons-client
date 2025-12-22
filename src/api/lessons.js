import { apiFetch } from "./client";

// CREATE lesson
export function createLesson(lesson) {
  return apiFetch("/lessons", {
    method: "POST",
    body: JSON.stringify(lesson),
  });
}

// GET my lessons
export function getMyLessons(uid) {
  return apiFetch(`/lessons/my?uid=${uid}`);
}

//  GET public lessons 
export function getPublicLessons(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/lessons/public${qs ? `?${qs}` : ""}`);
}

// GET single lesson (
export function getLessonById(id) {
  return apiFetch(`/lessons/${id}`);
}
