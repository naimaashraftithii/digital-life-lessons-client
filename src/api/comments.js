import { apiFetch } from "./client";

export function getComments(lessonId) {
  return apiFetch(`/comments?lessonId=${lessonId}`);
}

export function addComment(payload) {
  return apiFetch("/comments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
