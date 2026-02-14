
import http from "./http";

// favorites toggle  
export const toggleFavorite = async (uid, lessonId) => {
  const { data } = await http.post("/favorites/toggle", { uid, lessonId });
  return data; 
};

// favorites
export const getFavorites = async (uid) => {
  const { data } = await http.get("/favorites", { params: { uid } });
  return Array.isArray(data) ? data : [];
};
