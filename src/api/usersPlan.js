// src/api/usersPlan.js

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


// // src/api/usersPlan.js
// import { apiFetch } from "./client";
// import http from "./http";
// // src/api/usersPlan.js

// const FREE = { isPremium: false, role: "user", user: null };

// export function getUserPlan(uid) {
//   if (!uid) return Promise.resolve(FREE);

//   return apiFetch(`/users/plan?uid=${encodeURIComponent(uid)}`, {}, {
//     allow404: true,
//     defaultValue: FREE,
//   });
// }




// export async function upsertUser(firebaseUser) {
//   if (!firebaseUser?.uid || !firebaseUser?.email) return;

//   const payload = {
//     uid: firebaseUser.uid,
//     email: firebaseUser.email,
//     name: firebaseUser.displayName || "",
//     photoURL: firebaseUser.photoURL || "",
//   };

//   const { data } = await http.post("/users/upsert", payload);
//   return data;
// }
