// src/api/usersPlan.js
import http from "./http";

/**
 * GET /users/plan/:uid
 * server returns: { isPremium, role, user }
 */
export const getUserPlan = async (uid) => {
  if (!uid) return { isPremium: false, role: "user", user: null };

  const { data } = await http.get(`/users/plan/${uid}`);
  return data || { isPremium: false, role: "user", user: null };
};
