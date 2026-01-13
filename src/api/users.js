// src/api/users.js
import { apiFetch } from "./client";

export async function upsertUser(firebaseUser) {
  if (!firebaseUser?.uid || !firebaseUser?.email) return;

  const payload = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName || "",
    photoURL: firebaseUser.photoURL || "",
  };

  return apiFetch("/users/upsert", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
