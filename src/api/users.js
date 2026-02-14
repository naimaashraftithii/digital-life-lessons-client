
import http from "./http";

export async function upsertUser(firebaseUser) {
  if (!firebaseUser?.uid || !firebaseUser?.email) return null;

  const payload = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName || "",
    photoURL: firebaseUser.photoURL || "",
  };

  const res = await http.post("/users/upsert", payload);
  return res.data;
}
