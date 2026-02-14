
import http from "./http";
const API = import.meta.env.VITE_API_URL;

export const getFeaturedLessons = async () => {
  const { data } = await http.get("/home/featured");
  return Array.isArray(data) ? data : [];
};

export const getMostSavedLessons = async () => {
  const { data } = await http.get("/home/most-saved");
  return Array.isArray(data) ? data : [];
};

//  days=7 
export const getTopContributors = async (days = 7) => {
  const { data } = await http.get("/home/top-contributors", {
    params: { days },
  });
  return Array.isArray(data) ? data : [];
};


