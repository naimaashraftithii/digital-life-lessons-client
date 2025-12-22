import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import GradientButton from "../../components/GradientButton";
import { startCheckout } from "../../api/stripe";

const Pricing = () => {
  const { user } = useAuth();
  const { plan, loading, refetch } = useUserPlan(user?.uid);
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("refresh") === "1") {
      refetch?.();
    }
  }, [params, refetch]);

  const isPremium = !!plan?.isPremium;

  const handleUpgrade = async () => {
    if (!user?.uid || !user?.email) {
      toast.error("Please login first");
      return;
    }

    try {
      await startCheckout({ uid: user.uid, email: user.email });
    } catch (err) {
      toast.error(err?.message || "Checkout failed");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white/80 p-6 shadow-sm backdrop-blur">
          Loading pricing...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[radial-gradient(1000px_600px_at_10%_10%,rgba(99,102,241,.18),transparent),radial-gradient(900px_500px_at_90%_15%,rgba(236,72,153,.16),transparent),linear-gradient(180deg,#f8fafc,white)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-[32px] bg-white/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1 text-xs font-extrabold tracking-widest text-slate-700 shadow-sm">
                PRICING <span className="text-slate-400">›</span> UPGRADE
              </p>
              <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Lifetime Premium
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-600">
                One-time payment for lifetime premium access. Unlock Premium lessons and Premium creation.
              </p>
            </div>

            {isPremium ? (
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-extrabold text-amber-800">
                Premium ⭐ Activated
              </span>
            ) : (
              <GradientButton variant="pinkRed" onClick={handleUpgrade}>
                Upgrade now (৳1500 / Lifetime)
              </GradientButton>
            )}
          </div>

          {/*  UI cards */}
          <div className="mt-8 rounded-3xl bg-white/70 p-5 text-sm font-semibold text-slate-600">
            <p>
              🔺 After successful payment, Premium status is activated via Stripe webhook.
              If it doesn’t update instantly, press refresh once.
            </p>

            {!isPremium && (
              <button
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-white font-bold"
                onClick={() => {
                  toast.info("Refreshing premium status…");
                  refetch?.();
                }}
              >
                Refresh premium status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
