const API = import.meta.env.VITE_API_URL;

export async function startCheckout({ uid, email }) {
  const res = await fetch(`${API}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Checkout failed");

  window.location.href = data.url;
}
