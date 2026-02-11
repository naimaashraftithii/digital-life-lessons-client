const API = import.meta.env.VITE_API_URL;
// src/api/stripe.js
import { apiFetch } from "./client";


export async function startCheckout({ uid, email }) {
  const data = await apiFetch("/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ uid, email }),
  });
  window.location.href = data.url;
}



// const API = import.meta.env.VITE_API_URL;
// // src/api/stripe.js
// import { apiFetch } from "./client";

// export async function startCheckout({ uid, email }) {
//   const data = await apiFetch("/create-checkout-session", {
//     method: "POST",
//     body: JSON.stringify({ uid, email }),
//   });

//   window.location.href = data.url;
// }

// export async function startCheckout({ uid, email }) {
//   const res = await fetch(`${API}/create-checkout-session`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ uid, email }),
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.message || "Checkout failed");

//   window.location.href = data.url;
// }
