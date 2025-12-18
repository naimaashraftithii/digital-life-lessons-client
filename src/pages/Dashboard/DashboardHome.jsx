import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Dashboard Overview
      </h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Lessons Created", value: 8 },
          { label: "Saved Favorites", value: 12 },
          { label: "Public Lessons", value: 5 },
          { label: "Premium Lessons", value: 2 },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold text-slate-500">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Quick actions
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/dashboard/add-lesson"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            ➕ Add New Lesson
          </Link>
          <Link
            to="/dashboard/my-lessons"
            className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-700"
          >
            📚 Manage Lessons
          </Link>
        </div>
      </div>

      {/* Analytics placeholder */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Activity (Weekly)
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Simple analytics chart will appear here (later).
        </p>

        <div className="mt-4 h-40 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
          📈 Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
