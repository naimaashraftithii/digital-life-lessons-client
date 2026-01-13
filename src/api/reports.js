// src/api/reports.js
import http from "./http";

// POST /lessonReports
export const reportLesson = async (payload) => {
  const { data } = await http.post("/lessonReports", payload);
  return data;
};
