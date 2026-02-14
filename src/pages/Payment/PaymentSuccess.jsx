import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Confirming payment...");

  const sessionId = params.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setStatus("Missing session_id in URL.");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API}/payments/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Confirm failed");

        setStatus("✅ Premium activated! Redirecting...");

        setTimeout(() => {
          navigate("/dashboard/profile", { replace: true });
          window.location.reload(); 
        }, 800);
      } catch (e) {
        setStatus("❌ " + (e?.message || "Something failed"));
      }
    })();
  }, [sessionId, navigate]);

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-10">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow">
        <h1 className="text-2xl font-extrabold">Payment Success</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">{status}</p>
      </div>
    </div>
  );
}
