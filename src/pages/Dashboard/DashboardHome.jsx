import { useMemo } from "react";
import { Link } from "react-router-dom";
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
import useAuth from "../../hooks/useAuth";
import useDashboardSummary from "../../hooks/useDashboardSummary";

function formatMMDD(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function buildLast7DaysSeries(lessons = []) {
  const today = startOfDay(new Date());

  // last 7 days including today
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  // count lessons by day
  const counts = new Map();
  for (const l of Array.isArray(lessons) ? lessons : []) {
    const createdAt = l?.createdAt ? new Date(l.createdAt) : null;
    if (!createdAt || Number.isNaN(createdAt.getTime())) continue;

    const key = startOfDay(createdAt).toISOString();
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return days.map((d) => {
    const key = startOfDay(d).toISOString();
    return {
      day: formatMMDD(d),
      lessons: counts.get(key) || 0,
    };
  });
}

const StatCard = ({ label, value, to }) => (
  <div className="rounded-2xl bg-white p-4 shadow-sm border">
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs font-extrabold tracking-widest text-slate-500">{label}</p>
      {to ? (
        <Link
          to={to}
          className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-extrabold text-white"
        >
          View
        </Link>
      ) : null}
    </div>
    <p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p>
  </div>
);

export default function DashboardHome() {
  const { user } = useAuth();
  const { data, loading, error } = useDashboardSummary(user?.uid);

  const stats = useMemo(() => {
    return {
      totalLessons: Number(data?.counts?.totalLessons || 0),
      publicLessons: Number(data?.counts?.publicLessons || 0),
      favorites: Number(data?.counts?.favorites || 0),
      likes: Number(data?.counts?.likes || 0),
    };
  }, [data]);

  // ✅ IMPORTANT:
  // Your hook should return recentlyAdded lessons OR myLessons list.
  // We'll use `data.recentLessons` if available; otherwise fallback to `data.lessons`.
  const sourceLessons = useMemo(() => {
    if (Array.isArray(data?.recentLessons)) return data.recentLessons;
    if (Array.isArray(data?.lessons)) return data.lessons;
    return [];
  }, [data]);

  const weeklySeries = useMemo(() => buildLast7DaysSeries(sourceLessons), [sourceLessons]);

  const recent = useMemo(() => {
    const arr = Array.isArray(data?.recentLessons) ? data.recentLessons : [];
    return arr.slice(0, 4);
  }, [data]);

  if (loading) return <LottieLoader />;

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-sm font-semibold text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Welcome back, {user?.displayName || "User"} 👋
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/dashboard/add-lesson"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
          >
            + Add Lesson
          </Link>
          <Link
            to="/dashboard/my-lessons"
            className="rounded-xl border px-4 py-2 text-sm font-extrabold text-slate-900"
          >
            My Lessons
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="TOTAL LESSONS" value={stats.totalLessons} to="/dashboard/my-lessons" />
        <StatCard label="PUBLIC LESSONS" value={stats.publicLessons} />
        <StatCard label="SAVED (FAVORITES)" value={stats.favorites} to="/dashboard/my-favorites" />
        <StatCard label="TOTAL LIKES" value={stats.likes} />
      </div>

      {/* Weekly Activity */}
      <div className="mt-6 rounded-3xl border bg-white p-5">
        <h2 className="text-lg font-extrabold text-slate-900">This week activity</h2>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          Lessons created per day (last 7 days)
        </p>

       <div className="mt-4 h-[260px] w-full min-w-0">
  <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={260}>
    <BarChart data={weeklySeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
      <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ borderRadius: 12 }} />

      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      <Bar dataKey="lessons" fill="url(#barGrad)" radius={[10, 10, 10, 10]} maxBarSize={46} />
    </BarChart>
  </ResponsiveContainer>
</div>

        {/* If everything 0 show message */}
        {weeklySeries.every((x) => x.lessons === 0) && (
          <p className="mt-2 text-xs font-semibold text-slate-500">
            No lessons created in the last 7 days.
          </p>
        )}
      </div>

      {/* Recently added */}
      <div className="mt-6 rounded-3xl border bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">Recently added</h2>
          <Link to="/dashboard/my-lessons" className="text-sm font-extrabold underline">
            View all
          </Link>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recent.map((l) => (
            <div key={l._id} className="rounded-2xl border p-4">
              <p className="text-sm font-extrabold text-slate-900 line-clamp-2">{l.title}</p>
              <p className="mt-1 text-xs font-semibold text-slate-600 line-clamp-2">
                {l.description}
              </p>
              <p className="mt-2 text-xs font-bold text-slate-500">
                {l.createdAt ? new Date(l.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
          ))}

          {!recent.length && (
            <div className="rounded-2xl bg-slate-50 p-5 text-center md:col-span-2 lg:col-span-3">
              <p className="font-extrabold text-slate-900">No lessons yet</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Create your first lesson to see dashboard activity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
