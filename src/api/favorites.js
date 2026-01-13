// src/api/favorites.js
import http from "./http";

// GET /favorites?uid=xxx  -> array
export const getFavorites = async (uid) => {
  if (!uid) return [];
  const { data } = await http.get("/favorites", { params: { uid } });
  return Array.isArray(data) ? data : [];
};

// POST /favorites/toggle  { uid, lessonId } -> { saved: boolean }
export const toggleFavorite = async (uid, lessonId) => {
  const { data } = await http.post("/favorites/toggle", { uid, lessonId });
  return data;
};
