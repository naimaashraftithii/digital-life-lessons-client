
import http from "./http";


export const getComments = async (lessonId) => {
  if (!lessonId) return [];
  const { data } = await http.get("/comments", { params: { lessonId } });
  return Array.isArray(data) ? data : [];
};

// POST 
export const addComment = async (payload) => {
  const { data } = await http.post("/comments", payload);
  return data;
};

// DELETE 
export const deleteComment = async (commentId, uid) => {
  const { data } = await http.delete(`/comments/${commentId}`, {
    params: { uid },
  });
  return data;
};
