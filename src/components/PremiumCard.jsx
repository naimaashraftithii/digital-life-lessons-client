export default function PremiumCard({ userName = "Friend" }) {
  return (
    <div className="mt-5 rounded-3xl border bg-white/70 p-5 shadow-sm backdrop-blur">
      <p className="text-xs font-extrabold tracking-widest text-slate-500">
        PREMIUM MEMBER
      </p>
      <h3 className="mt-2 text-xl font-extrabold text-slate-900">
        Welcome, {userName} ⭐
      </h3>
      <p className="mt-1 text-sm font-semibold text-slate-600">
        Premium is active. You can read premium lessons and create premium content.
      </p>
    </div>
  );
}
