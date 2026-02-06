// src/api/home.js
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

// ✅ days=7 or days=0 (all-time)
export const getTopContributors = async (days = 7) => {
  const { data } = await http.get("/home/top-contributors", {
    params: { days },
  });
  return Array.isArray(data) ? data : [];
};


// async function safeJson(res) {
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(data?.message || "Request failed");
//   return data;
// }

// export async function getTopContributors(days = 7) {
//   const res = await fetch(`${API}/home/top-contributors?days=${days}`);
//   return safeJson(res);
// }


// export async function getFeaturedLessons() {
//   const res = await fetch(`${API}/home/featured`);
//   return await res.json();
// }

// export async function getMostSavedLessons() {
//   const res = await fetch(`${API}/home/most-saved`);
//   return await res.json();
// }


