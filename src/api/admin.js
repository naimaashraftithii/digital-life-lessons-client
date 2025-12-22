import { apiFetch } from "./client";

// USERS
export const adminGetUsers = () => apiFetch("/admin/users");
export const adminSetUserRole = (uid, role) =>
  apiFetch("/admin/users/role", {
    method: "PATCH",
    body: JSON.stringify({ uid, role }),
  });

export const adminDeleteUser = (uid) =>
  apiFetch(`/admin/users/${uid}`, { method: "DELETE" });

// LESSONS
export const adminGetLessons = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/admin/lessons${qs ? `?${qs}` : ""}`);
};

export const adminToggleFeatured = (id, isFeatured) =>
  apiFetch(`/admin/lessons/${id}/featured`, {
    method: "PATCH",
    body: JSON.stringify({ isFeatured }),
  });

export const adminToggleReviewed = (id, isReviewed) =>
  apiFetch(`/admin/lessons/${id}/reviewed`, {
    method: "PATCH",
    body: JSON.stringify({ isReviewed }),
  });

export const adminDeleteLesson = (id) =>
  apiFetch(`/admin/lessons/${id}`, { method: "DELETE" });
export function getReportedLessons() {
  return apiFetch("/admin/reported-lessons");
}

export function ignoreReports(lessonId) {
  return apiFetch(`/admin/reported-lessons/${lessonId}`, { method: "DELETE" });
}

export function deleteLessonAdmin(lessonId) {
  return apiFetch(`/admin/lessons/${lessonId}`, { method: "DELETE" });
}