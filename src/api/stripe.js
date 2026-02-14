const API = import.meta.env.VITE_API_URL;

import { apiFetch } from "./client";

export async function startCheckout({ uid, email }) {
  const data = await apiFetch("/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ uid, email }),
  });
  window.location.href = data.url;
}



