// src/api/dashboard.js
import http from "./http";

// dashboard summary
export const getDashboardSummary = async (uid) => {
  if (!uid) return null;
  const { data } = await http.get("/dashboard/summary", { params: { uid } });
  return data;
};
