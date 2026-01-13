// src/api/admin.js
import http from "./http";

/* -------------------- USERS -------------------- */
export const adminGetUsers = async () => {
  const { data } = await http.get("/admin/users");
  return data;
};

export const adminSetUserRole = async (uid, role) => {
  const { data } = await http.patch("/admin/users/role", { uid, role });
  return data;
};

export const adminDeleteUser = async (uid) => {
  const { data } = await http.delete(`/admin/users/${uid}`);
  return data;
};

/* -------------------- LESSONS -------------------- */
export const adminGetLessons = async (params = {}) => {
  const { data } = await http.get("/admin/lessons", { params });
  return data;
};

export const adminToggleFeatured = async (id, value) => {
  const { data } = await http.patch(`/admin/lessons/${id}/featured`, { value });
  return data;
};

export const adminToggleReviewed = async (id, value) => {
  const { data } = await http.patch(`/admin/lessons/${id}/reviewed`, { value });
  return data;
};

export const adminDeleteLesson = async (id) => {
  const { data } = await http.delete(`/admin/lessons/${id}`);
  return data;
};

// ✅ Your ReportedLessons imports this name
export const deleteLessonAdmin = adminDeleteLesson;

/* -------------------- REPORTED LESSONS -------------------- */
export const getReportedLessons = async () => {
  const { data } = await http.get("/admin/reported-lessons");
  return data;
};

export const ignoreReports = async (lessonId) => {
  const { data } = await http.delete(`/admin/reported-lessons/${lessonId}`);
  return data;
};
