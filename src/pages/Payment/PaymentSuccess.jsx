import { useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";

const API = import.meta.env.VITE_API_URL;

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { user } = useAuth();

  const { plan, loading, refetch } = useUserPlan(user?.uid);


  const shownRef = useRef(false);

  // Call confirm once 
  useEffect(() => {
    if (!user?.uid || !sessionId) return;

    (async () => {
      try {
        await fetch(`${API}/payments/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        }).catch(() => {});
      } finally {
        refetch?.(); 
      }
    })();
  }, [user?.uid, sessionId, refetch]);

  //  When plan becomes premium SweetAlert 
  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (shownRef.current) return;

    if (plan?.isPremium) {
      shownRef.current = true;

      Swal.fire({
        icon: "success",
        title: "Payment Successful ✅",
        text: "Premium activated! Enjoy premium lessons ⭐",
        confirmButtonText: "Go to Profile",
      }).then(() => {
        toast.success("Premium activated ⭐");
        navigate("/dashboard/profile", { replace: true });
      });
    }
  }, [loading, plan?.isPremium, user, navigate]);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
          <h2 className="text-xl font-extrabold text-slate-900">Login required</h2>
          <p className="mt-2 text-sm text-slate-600">Please login to confirm premium.</p>
          <Link
            to="/login"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white font-bold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="max-w-md rounded-2xl bg-white p-6 shadow-sm text-center">
        <h2 className="text-xl font-extrabold text-slate-900">Processing payment…</h2>

        <p className="mt-2 text-sm text-slate-600">
          Session: <span className="font-mono text-xs">{sessionId || "N/A"}</span>
        </p>

        <button
          onClick={() => {
            toast.info("Refreshing premium status…");
            refetch?.();
          }}
          className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
        >
          Refresh Premium Status
        </button>

        <Link
          to="/pricing?refresh=1"
          className="mt-4 block text-sm font-bold text-primary hover:underline"
        >
          Back to Pricing
        </Link>

        <p className="mt-3 text-xs text-slate-500">
          If webhook is delayed, press refresh once.
        </p>
      </div>
    </div>
  );
}
