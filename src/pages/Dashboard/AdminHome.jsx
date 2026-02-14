
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import LottieLoader from "../../components/LottieLoader";
import { getAdminSummary } from "../../api/admin";

const FALLBACK_AVATAR = "https://i.ibb.co/ZxK3f6K/user.png";

const Card = ({ label, value }) => (
  <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
    <p className="text-xs font-extrabold tracking-widest text-slate-500">{label}</p>
    <p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p>
  </div>
);

export default function AdminHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getAdminSummary();
        if (!ignore) setData(res);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load admin summary");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => (ignore = true);
  }, []);

  const c = data?.counts || {};
  const series = Array.isArray(data?.series) ? data.series : [];
  const top = Array.isArray(data?.topContributors) ? data.topContributors : [];
  const topMode = data?.topMode || "last7days";

  const maxTop = useMemo(() => {
    const m = Math.max(...top.map((x) => x.lessons || 0), 0);
    return m || 1;
  }, [top]);

  if (loading) return <LottieLoader />;
  if (err)
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-sm font-semibold text-red-700">
        {err}
      </div>
    );

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-xl font-extrabold text-slate-900">Admin Dashboard</h2>
        <p className="mt-1 text-sm font-semibold text-slate-600">Platform analytics overview</p>

        <p className="mt-2 text-xs font-bold text-slate-500">
          Contributors mode:{" "}
          <span className="font-extrabold text-slate-800">
            {topMode === "allTime" ? "All-time (fallback)" : "Last 7 days"}
          </span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="TOTAL USERS" value={c.totalUsers ?? 0} />
        <Card label="PUBLIC LESSONS" value={c.totalPublicLessons ?? 0} />
        <Card label="PRIVATE LESSONS" value={c.totalPrivateLessons ?? 0} />
        <Card label="REPORTED LESSONS" value={c.totalReports ?? 0} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Chart */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:col-span-2">
          <h3 className="text-lg font-extrabold text-slate-900">Lessons create-last 7 days</h3>
          <p className="mt-1 text-sm font-semibold text-slate-600">Platform-wide activity</p>

          {/*  FIX Recharts */}
          <div className="mt-4 w-full min-w-0">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={series} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="lessons" radius={[10, 10, 10, 10]} maxBarSize={46} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {series.every((x) => (x.lessons || 0) === 0) && (
            <p className="mt-2 text-xs font-semibold text-slate-500">
              No lessons created in the last 7 days.
            </p>
          )}
        </div>

        {/*  Top contributors */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h3 className="text-lg font-extrabold text-slate-900">Most active contributors</h3>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            {topMode === "allTime" ? "All-time" : "Last 7 days"}
          </p>

          <div className="mt-4 space-y-3">
            {top.map((u) => (
              <div key={u.uid} className="rounded-2xl border p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={u.photoURL || FALLBACK_AVATAR}
                    onError={(e) => (e.currentTarget.src = FALLBACK_AVATAR)}
                    alt={u.name || "User"}
                    className="h-10 w-10 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-slate-900">
                      {u.name || "Unknown"}
                    </p>
                    <p className="text-xs font-semibold text-slate-600">{u.lessons || 0} lessons</p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-slate-900 transition-all"
                    style={{ width: `${Math.round(((u.lessons || 0) / maxTop) * 100)}%` }}
                  />
                </div>
              </div>
            ))}

            {!top.length && (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">
                No contributors yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <p className="text-sm font-extrabold text-slate-900">
          Today’s new lessons:{" "}
          <span className="text-slate-700">{c.todaysNewLessons ?? 0}</span>
        </p>
      </div>
    </div>
  );
}
