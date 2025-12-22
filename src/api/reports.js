import { apiFetch } from "./client";

export function reportLesson(payload) {
  return apiFetch("/lessonReports", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
