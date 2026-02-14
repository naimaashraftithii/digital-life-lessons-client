

import http from "./http";

const FREE = { isPremium: false, role: "user", user: null };

export async function getUserPlan(uid) {
  if (!uid) return FREE;
  try {
    const { data } = await http.get("/users/plan", { params: { uid } });
    return data ?? FREE;
  } catch {
    return FREE;
  }
}

