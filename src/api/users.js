const API = import.meta.env.VITE_API_URL;

export async function upsertUser(firebaseUser) {
  if (!firebaseUser?.uid || !firebaseUser?.email) return;

  const payload = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName || "",
    photoURL: firebaseUser.photoURL || "",
  };

  const res = await fetch(`${API}/users/upsert`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  // if server says not ok, throw message
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Upsert failed");

  return data;
}
