// src/api/lessons.js
import http from "./http";

/* -------------------- PUBLIC -------------------- */

// server returns: { lessons, total, currentPage, totalPages }
export const getPublicLessons = async (params = {}) => {
  const { data } = await http.get("/lessons/public", { params });
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.lessons)) return data.lessons;
  return [];
};

export const getPublicLessonsWithMeta = async (params = {}) => {
  const { data } = await http.get("/lessons/public", { params });

  const lessons = Array.isArray(data?.lessons)
    ? data.lessons
    : Array.isArray(data)
    ? data
    : [];

  return {
    lessons,
    total: Number(data?.total ?? lessons.length ?? 0),
    currentPage: Number(data?.currentPage ?? 1),
    totalPages: Number(data?.totalPages ?? 1),
  };
};

/* -------------------- DETAILS -------------------- */

export const getLessonById = async (id) => {
  const { data } = await http.get(`/lessons/${id}`);
  return data || null;
};

export const getSimilarLessons = async (id) => {
  const { data } = await http.get(`/lessons/${id}/similar`);
  return Array.isArray(data) ? data : [];
};

export const toggleLike = async (id, uid) => {
  const { data } = await http.patch(`/lessons/${id}/like`, { uid });
  return data || { likesCount: 0 };
};

export const getFavoritesCount = async (id) => {
  const { data } = await http.get(`/lessons/${id}/favorites-count`);
  return data || { favoritesCount: 0 };
};

/* -------------------- MY LESSONS -------------------- */

export const getMyLessons = async (uid) => {
  if (!uid) return [];
  const { data } = await http.get("/lessons/my", { params: { uid } });
  return Array.isArray(data) ? data : [];
};

/* -------------------- CREATE / UPDATE / DELETE -------------------- */

export const createLesson = async (payload) => {
  const { data } = await http.post("/lessons", payload);
  return data;
};

export const updateLesson = async (id, payload) => {
  const { data } = await http.patch(`/lessons/${id}`, payload);
  return data;
};

export const deleteLesson = async (id) => {
  const { data } = await http.delete(`/lessons/${id}`);
  return data;
};

export const setLessonVisibility = async (id, visibility) => {
  const { data } = await http.patch(`/lessons/${id}/visibility`, { visibility });
  return data;
};

export const setLessonAccessLevel = async (id, accessLevel) => {
  const { data } = await http.patch(`/lessons/${id}/access`, { accessLevel });
  return data;
};
