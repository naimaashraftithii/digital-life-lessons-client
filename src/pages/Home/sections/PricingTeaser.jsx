import { Link } from "react-router-dom";
import GradientButton from "../../../components/GradientButton";

const plans = [
  {
    name: "FREE",
    price: "৳0",
    subtitle: "Start reflecting today",
    accent: "from-sky-400 to-indigo-500",
    features: [
      "Create unlimited Free lessons",
      "View public Free lessons",
      "Save favorites",
      "Basic profile",
    ],
    btn: {
      text: "Explore Public Lessons",
      to: "/public-lessons",
      variant: "greenBlue",
    },
  },
  {
    name: "LIFETIME",
    price: "৳1500",
    subtitle: "One-time Premium access",
    accent: "from-amber-400 to-orange-500",
    features: [
      "View Premium public lessons",
      "Create Premium lessons",
      "Premium lock/blur support",
      "Priority visibility (later)",
    ],
    btn: { text: "Go to Pricing", to: "/pricing", variant: "pinkRed" },
    highlight: true,
  },
  {
    name: "PREMIUM",
    price: "⭐",
    subtitle: "Premium badge & benefits",
    accent: "from-fuchsia-500 to-pink-500",
    features: [
      "Ad-free experience (later)",
      "Advanced filters (later)",
      "Featured requests (later)",
      "Faster support (later)",
    ],
    btn: { text: "Upgrade", to: "/pricing", variant: "bluePink" },
  },
];

const PricingTeaser = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14">
      {/* ✅ Background gradient + soft blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1 text-xs font-extrabold tracking-widest text-slate-700 shadow-sm backdrop-blur">
            PRICING
            <span className="text-slate-400">›</span>
            UPGRADE
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Start free anytime. Upgrade once for lifetime Premium access—unlock premium
            lessons and premium creation.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((p, idx) => (
            <div
              key={p.name}
              className={[
                "group relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-white/50 backdrop-blur",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-white/70",
                p.highlight ? "lg:-translate-y-2 lg:shadow-xl" : "",
              ].join(" ")}
              style={{
                animation: "fadeUp .55s ease both",
                animationDelay: `${idx * 120}ms`,
              }}
            >
              {/* Accent header */}
              <div className={`absolute left-0 top-0 h-32 w-full bg-gradient-to-r ${p.accent}`} />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
                <div className="absolute -right-24 top-2 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
              </div>

              {/* Best value badge */}
              {p.highlight && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-extrabold text-amber-700 shadow-sm">
                  Best value ✨
                </div>
              )}

              {/* Top content */}
              <div className="relative z-10">
                <p className="text-center text-xs font-extrabold tracking-[0.22em] text-white/95">
                  {p.name}
                </p>

                <p className="mt-2 text-center text-4xl font-extrabold text-white sm:text-5xl">
                  {p.price}
                </p>

                <p className="mt-2 text-center text-xs font-semibold text-white/90">
                  {p.subtitle}
                </p>

                {/* Highlight pulse line */}
                {p.highlight && (
                  <div className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-white/80 animate-pulse" />
                )}
              </div>

              {/* Body */}
              <div className="relative z-10 mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition group-hover:shadow-md">
                <ul className="space-y-3 text-sm text-slate-700">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-extrabold text-white">
                        ✓
                      </span>
                      <span className="font-semibold leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex justify-center">
                  <Link to={p.btn.to} className="w-full sm:w-auto">
                    <GradientButton
                      variant={p.btn.variant}
                      className="w-full sm:w-auto"
                    >
                      {p.btn.text}
                    </GradientButton>
                  </Link>
                </div>

                {/* small hint */}
                <p className="mt-4 text-center text-xs text-slate-500">
                  No hidden fees • Cancel anytime (if monthly later)
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-8 text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:underline"
          >
            See full comparison table <span className="text-base">→</span>
          </Link>
        </div>

        {/* tiny keyframes */}
        <style>
          {`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default PricingTeaser;
