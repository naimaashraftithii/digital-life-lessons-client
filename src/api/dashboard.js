import { apiFetch } from "./client";

export function getDashboardSummary(uid) {
  return apiFetch(`/dashboard/summary?uid=${encodeURIComponent(uid)}`);
}
