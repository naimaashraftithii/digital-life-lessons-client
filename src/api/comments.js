// src/api/comments.js
import http from "./http";

// GET /comments?lessonId=xxx -> array
export const getComments = async (lessonId) => {
  if (!lessonId) return [];
  const { data } = await http.get("/comments", { params: { lessonId } });
  return Array.isArray(data) ? data : [];
};

// POST /comments
export const addComment = async (payload) => {
  const { data } = await http.post("/comments", payload);
  return data;
};

// DELETE /comments/:commentId?uid=xxx
export const deleteComment = async (commentId, uid) => {
  const { data } = await http.delete(`/comments/${commentId}`, {
    params: { uid },
  });
  return data;
};
