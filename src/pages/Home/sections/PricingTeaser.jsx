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
    btn: { text: "Explore Public Lessons", to: "/public-lessons", variant: "greenBlue" },
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
    <section className="bg-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Choose your plan
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Free to start. Upgrade once for lifetime Premium access.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur ${
                p.highlight ? "ring-2 ring-amber-300" : "border border-white/50"
              }`}
            >
              {/* Top badge ribbon */}
              <div
                className={`absolute left-0 top-0 h-28 w-full bg-gradient-to-r ${p.accent} opacity-90`}
              />
              <div className="relative">
                <p className="text-center text-sm font-extrabold tracking-widest text-white">
                  {p.name}
                </p>
                <p className="mt-2 text-center text-4xl font-extrabold text-white">
                  {p.price}
                </p>
                <p className="mt-1 text-center text-xs font-semibold text-white/90">
                  {p.subtitle}
                </p>
              </div>

              <div className="relative mt-6 rounded-2xl bg-white p-5">
                <ul className="space-y-2 text-sm text-slate-700">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />
                      <span className="font-semibold">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex justify-center">
                  <Link to={p.btn.to}>
                    <GradientButton variant={p.btn.variant}>
                      {p.btn.text}
                    </GradientButton>
                  </Link>
                </div>
              </div>

              {p.highlight && (
                <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-extrabold text-amber-700">
                  Best value
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/pricing" className="text-sm font-extrabold text-primary hover:underline">
            See full comparison table →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
