import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-indigo-100 text-indigo-700"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/100"}
                  className="h-10 w-10 rounded-full"
                  alt="User"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-slate-500">Dashboard</p>
                </div>
              </div>

              <nav className="space-y-1">
                <NavLink to="/dashboard" end className={linkClass}>
                  📊 Overview
                </NavLink>
                <NavLink to="/dashboard/add-lesson" className={linkClass}>
                  ➕ Add Lesson
                </NavLink>
                <NavLink to="/dashboard/my-lessons" className={linkClass}>
                  📚 My Lessons
                </NavLink>
                <NavLink to="/dashboard/my-favorites" className={linkClass}>
                  🔖 My Favorites
                </NavLink>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-9">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
