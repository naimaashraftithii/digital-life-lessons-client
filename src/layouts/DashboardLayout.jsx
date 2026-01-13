// src/layouts/DashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";
import LottieLoader from "../components/LottieLoader";

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `block rounded-xl px-4 py-2 text-sm font-extrabold transition ${
        isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function DashboardLayout() {
  const { user, loading: authLoading } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  if (authLoading || planLoading) return <LottieLoader />;

  const isAdmin = plan?.role === "admin";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl bg-white border shadow-sm p-4 h-fit sticky top-6">
          <div className="flex items-center gap-3 p-2">
            <img
              src={user?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
              className="h-12 w-12 rounded-2xl object-cover"
              alt="avatar"
            />
            <div>
              <p className="text-sm font-extrabold text-slate-900 line-clamp-1">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs font-semibold text-slate-600 line-clamp-1">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="px-2 text-[11px] font-extrabold text-slate-500 tracking-widest">
              USER
            </p>
            <NavItem to="/dashboard" label="Dashboard Home" />
            <NavItem to="/dashboard/add-lesson" label="Add Lesson" />
            <NavItem to="/dashboard/my-lessons" label="My Lessons" />
            <NavItem to="/dashboard/my-favorites" label="My Favorites" />
            <NavItem to="/dashboard/profile" label="Profile" />
          </div>

          {isAdmin && (
            <div className="mt-6 space-y-1">
              <p className="px-2 text-[11px] font-extrabold text-slate-500 tracking-widest">
                ADMIN
              </p>
              <NavItem to="/dashboard/admin" label="Admin Home" />
              <NavItem to="/dashboard/admin/manage-users" label="Manage Users" />
              <NavItem to="/dashboard/admin/manage-lessons" label="Manage Lessons" />
              <NavItem to="/dashboard/admin/reported-lessons" label="Reported Lessons" />
              <NavItem to="/dashboard/admin/profile" label="Admin Profile" />
            </div>
          )}
        </aside>

        {/* Content */}
        <main className="rounded-2xl bg-white border shadow-sm overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
