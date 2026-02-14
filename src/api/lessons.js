
import http from "./http";

/*  PUBLIC  */

export const getPublicLessonsWithMeta = async (params = {}) => {
  const res = await http.get("/lessons/public", { params });
  const data = res.data;

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

export const getPublicLessons = async (params = {}) => {
  const res = await getPublicLessonsWithMeta(params);
  return res.lessons || [];
};

/*  DETAILS */
export const getLessonById = async (id) => {
  const res = await http.get(`/lessons/${id}`);
  return res.data || null;
};

export const getSimilarLessons = async (id) => {
  const res = await http.get(`/lessons/${id}/similar`);
  return Array.isArray(res.data) ? res.data : [];
};

export const toggleLike = async (id, uid) => {
  const res = await http.patch(`/lessons/${id}/like`, { uid });
  return res.data || { likesCount: 0 };
};

export const getFavoritesCount = async (id) => {
  const res = await http.get(`/lessons/${id}/favorites-count`);
  return res.data || { favoritesCount: 0 };
};

/* MY LESSONS  */
export const getMyLessons = async (uid) => {
  if (!uid) return [];
  const res = await http.get("/lessons/my", { params: { uid } });
  return Array.isArray(res.data) ? res.data : [];
};

/* CREATE / UPDATE / DELETE  */
export const createLesson = async (lesson) => {
  const res = await http.post("/lessons", lesson);
  return res.data;
};

export const updateLesson = async (id, payload) => {
  const res = await http.patch(`/lessons/${id}`, payload);
  return res.data;
};

export const deleteLesson = async (id) => {
  const res = await http.delete(`/lessons/${id}`);
  return res.data;
};

export const setLessonVisibility = async (id, visibility) => {
  const res = await http.patch(`/lessons/${id}/visibility`, { visibility });
  return res.data;
};

export const setLessonAccessLevel = async (id, accessLevel) => {
  const res = await http.patch(`/lessons/${id}/access`, { accessLevel });
  return res.data;
};
