import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import { startCheckout } from "../../api/stripe";

const rows = [
  { label: "Total lessons access", free: "Limited", premium: "Unlimited" },
  { label: "Create premium lessons", free: "❌ No", premium: "✅ Yes" },
  { label: "Read premium lessons", free: "❌ Locked", premium: "✅ Unlocked" },
  { label: "Ads", free: "Yes", premium: "No (Ad-free)" },
  { label: "Priority listing", free: "Normal", premium: "High priority" },
  { label: "Support", free: "Standard", premium: "Priority support" },
  { label: "Profile badge", free: "Free", premium: "Premium ⭐ + 👑" },
  { label: "Access duration", free: "Lifetime (Free)", premium: "Lifetime (Premium)" }
];

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { plan, loading, refetch } = useUserPlan(user?.uid);
  const [params] = useSearchParams();

  const isPremium = !!plan?.isPremium;

  useEffect(() => {
    if (params.get("refresh") === "1") refetch?.();
  }, [params, refetch]);

  const handleUpgrade = async () => {
    if (!user?.uid || !user?.email) return toast.error("Please login first");
    try {
      await startCheckout({ uid: user.uid, email: user.email });
    } catch (e) {
      toast.error(e?.message || "Checkout failed");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm font-semibold">
          Loading pricing…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Free vs Premium</h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Premium is a one-time payment: <b>৳1500</b> (Lifetime access)
              </p>
            </div>

            {isPremium ? (
              <div className="text-right">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-3 text-sm font-extrabold text-amber-800">
                  👑 You are our respected Premium user
                </div>
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white"
                >
                  Go to Profile
                </button>
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white"
              >
                Upgrade to Premium (৳1500)
              </button>
            )}
          </div>

          {/* comparison table */}
          <div className="mt-8 overflow-x-auto rounded-3xl border">
            <table className="min-w-[800px] w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr className="text-xs font-extrabold uppercase text-slate-600">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Free</th>
                  <th className="p-4">Premium</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t">
                    <td className="p-4 font-extrabold text-slate-900">{r.label}</td>
                    <td className="p-4 font-semibold text-slate-700">{r.free}</td>
                    <td className="p-4 font-semibold text-slate-700">{r.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* help text */}
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            After payment, Premium is activated by Stripe webhook.
            If it doesn’t update instantly, go to{" "}
            <b>/payment-success</b> and press refresh once.
            {!isPremium && (
              <button
                className="ml-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-extrabold text-white"
                onClick={() => refetch?.()}
              >
                Refresh premium status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
