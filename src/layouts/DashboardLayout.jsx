import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";

export default function DashboardLayout() {
  const { user } = useAuth();
  const { plan } = useUserPlan(user?.uid);
  const isAdmin = plan?.role === "admin";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 grid gap-6 md:grid-cols-[260px_1fr]">
      <aside className="rounded-3xl bg-white p-5 shadow-sm">
        {/* Back to Home */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-extrabold text-white"
        >
          ← Back to Home
        </Link>

        <nav className="space-y-2">
          <NavLink to="/dashboard" className="block rounded-xl px-3 py-2 font-bold">
            Dashboard Home
          </NavLink>
          <NavLink to="/dashboard/add-lesson" className="block rounded-xl px-3 py-2 font-bold">
            Add Lesson
          </NavLink>
          <NavLink to="/dashboard/my-lessons" className="block rounded-xl px-3 py-2 font-bold">
            My Lessons
          </NavLink>
          <NavLink to="/dashboard/my-favorites" className="block rounded-xl px-3 py-2 font-bold">
            My Favorites
          </NavLink>
          <NavLink to="/dashboard/profile" className="block rounded-xl px-3 py-2 font-bold">
            Profile
          </NavLink>

          {/* Admin link  */}
          {isAdmin && (
            <NavLink to="/dashboard/admin" className="block rounded-xl px-3 py-2 font-extrabold">
              Admin Panel
            </NavLink>
          )}
        </nav>
      </aside>

      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
}


