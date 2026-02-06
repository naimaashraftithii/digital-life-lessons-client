// src/api/favorites.js
import http from "./http";

// POST /favorites/toggle  { uid, lessonId }
export const toggleFavorite = async (uid, lessonId) => {
  const { data } = await http.post("/favorites/toggle", { uid, lessonId });
  return data; // { saved: true/false }
};

// GET /favorites?uid=xxx
export const getFavorites = async (uid) => {
  const { data } = await http.get("/favorites", { params: { uid } });
  return Array.isArray(data) ? data : [];
};
