import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const linkClass = ({ isActive }) =>
    `block rounded-xl px-3 py-2 text-sm font-medium ${
      isActive ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-500">Dashboard</h3>
        <nav className="space-y-1">
          <NavLink to="/dashboard" end className={linkClass}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/add-lesson" className={linkClass}>
            Add Lesson
          </NavLink>
          <NavLink to="/dashboard/my-lessons" className={linkClass}>
            My Lessons
          </NavLink>
        </nav>
      </aside>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
