import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import LottieLoader from "../../components/LottieLoader";

export default function Admin() {
  const { user } = useAuth();
  const { plan, loading } = useUserPlan(user?.uid);

  if (loading) return <LottieLoader />;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-xl font-extrabold text-slate-900">Admin Panel</h1>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          Welcome,{" "}
          <span className="font-extrabold text-slate-900">
            {plan?.user?.name || user?.displayName || "Admin"}
          </span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white">
            Role: {plan?.role || "admin"}
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
            Premium: {plan?.isPremium ? "YES" : "NO"}
          </span>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
