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
        {/* ✅ Back to Home */}
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

          {/* ✅ Admin link only if admin */}
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




// import { NavLink, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import useUserPlan from "../hooks/useUserPlan";
// import LottieLoader from "../components/LottieLoader";

// const linkBase =
//   "rounded-xl px-3 py-2 text-sm font-extrabold transition hover:bg-slate-100";

// const linkActive = "bg-slate-900 text-white hover:bg-slate-900";

// export default function DashboardLayout() {
//   const { user } = useAuth();
//   const { plan, loading } = useUserPlan(user?.uid);

//   if (loading) return <LottieLoader />;

//   const isAdmin = (plan?.role || "user") === "admin";
//   const avatar =
//     plan?.user?.photoURL || user?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png";

//   return (
//     <div className="min-h-[calc(100vh-70px)] bg-slate-50">
//       <div className="mx-auto max-w-7xl px-4 py-6">
//         <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
//           {/* Sidebar */}
//           <aside className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
//             <div className="flex items-center gap-3">
//               <img
//                 src={avatar}
//                 onError={(e) => (e.currentTarget.src = "https://i.ibb.co/ZxK3f6K/user.png")}
//                 alt="avatar"
//                 className="h-12 w-12 rounded-2xl object-cover"
//               />
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-extrabold text-slate-900">
//                   {plan?.user?.name || user?.displayName || "User"}
//                 </p>
//                 <p className="truncate text-xs font-semibold text-slate-500">
//                   {plan?.user?.email || user?.email}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4 grid gap-2">
//               <NavLink
//                 to="/dashboard"
//                 end
//                 className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//               >
//                 Dashboard Home
//               </NavLink>

//               <NavLink
//                 to="/dashboard/add-lesson"
//                 className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//               >
//                 Add Lesson
//               </NavLink>

//               <NavLink
//                 to="/dashboard/my-lessons"
//                 className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//               >
//                 My Lessons
//               </NavLink>

//               <NavLink
//                 to="/dashboard/my-favorites"
//                 className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//               >
//                 My Favorites
//               </NavLink>

//               <NavLink
//                 to="/dashboard/profile"
//                 className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//               >
//                 Profile
//               </NavLink>

//               {isAdmin && (
//                 <div className="mt-2 rounded-2xl bg-slate-50 p-3">
//                   <p className="text-xs font-extrabold text-slate-500 mb-2">ADMIN</p>

//                   <NavLink
//                     to="/dashboard/admin"
//                     end
//                     className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//                   >
//                     Admin Home
//                   </NavLink>

//                   <NavLink
//                     to="/dashboard/admin/manage-users"
//                     className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//                   >
//                     Manage Users
//                   </NavLink>

//                   <NavLink
//                     to="/dashboard/admin/manage-lessons"
//                     className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//                   >
//                     Manage Lessons
//                   </NavLink>

//                   <NavLink
//                     to="/dashboard/admin/reported-lessons"
//                     className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//                   >
//                     Reported Lessons
//                   </NavLink>

//                   <NavLink
//                     to="/dashboard/admin/profile"
//                     className={({ isActive }) => `${linkBase} ${isActive ? linkActive : "text-slate-800"}`}
//                   >
//                     Admin Profile
//                   </NavLink>
//                 </div>
//               )}
//             </div>
//           </aside>

//           {/* Main */}
//           <main className="min-w-0">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }
