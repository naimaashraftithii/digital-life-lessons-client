// src/api/dashboard.js
import { apiFetch } from "./client";

export function getDashboardSummary(uid) {
  if (!uid) return Promise.resolve(null);
  return apiFetch(`/dashboard/summary?uid=${encodeURIComponent(uid)}`);
}
