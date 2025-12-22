import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";
import GradientButton from "../components/GradientButton";
import LottieLoader from "../components/LottieLoader";

const navClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-extrabold
   transition-all duration-200
   ${isActive
     ? "bg-white/90 text-slate-900 shadow-sm"
     : "text-slate-700 hover:bg-white/70 hover:shadow-sm hover:-translate-y-[1px]"
   }`;

const Sidebar = ({
  user,
  isAdmin,
  isPremium,
  menu,
  mobile = false,
  onClose,
  onLogout,
}) => {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 font-extrabold text-slate-900 shadow-sm">
            DL
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-slate-900">
              Digital Life Lessons
            </p>
            <p className="text-xs font-semibold text-slate-600">Dashboard</p>
          </div>
        </div>

        {mobile && (
          <button
            onClick={onClose}
            className="rounded-xl bg-white/70 px-3 py-2 text-sm font-extrabold text-slate-800 shadow-sm"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {/* User card */}
      <div className="mx-4 rounded-3xl bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
            alt="user"
            className="h-12 w-12 rounded-2xl object-cover shadow-sm"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-slate-900">
              {user?.displayName || "User"}
            </p>
            <p className="truncate text-xs font-semibold text-slate-600">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {isAdmin ? (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white">
              Admin
            </span>
          ) : (
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-extrabold text-indigo-700">
              User
            </span>
          )}

          {isPremium ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
              Premium ⭐
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
              Free
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-4 flex-1 space-y-1 px-4">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            className={navClass} 
            onClick={() => mobile && onClose?.()}
          >
            <span className="text-lg">{m.icon}</span>
            <span>{m.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom  */}
      <div className="px-4 pb-5">
        {!isPremium && !isAdmin && (
          <div className="mb-3 rounded-3xl bg-white/70 p-4 shadow-sm backdrop-blur">
            <p className="text-sm font-extrabold text-slate-900">
              Unlock Premium ✨
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-600">
              Lifetime access ৳1500 (one-time).
            </p>
            <div className="mt-3">
              <NavLink to="/pricing" onClick={() => mobile && onClose?.()}>
                <GradientButton variant="pinkRed" className="w-full">
                  Go to Pricing
                </GradientButton>
              </NavLink>
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          className="w-full rounded-2xl bg-white/70 px-4 py-3 text-left text-sm font-extrabold text-rose-600 shadow-sm transition hover:bg-white/85"
          type="button"
        >
          🚪 Log out
        </button>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const { plan, loading } = useUserPlan(user?.uid);
  const isPremium = !!plan?.isPremium;
  const isAdmin = plan?.role === "admin";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const menu = useMemo(() => {
    const userMenu = [
      { to: "/dashboard", label: "Dashboard Home", icon: "📊" },
      { to: "/dashboard/add-lesson", label: "Add Lesson", icon: "➕" },
      { to: "/dashboard/my-lessons", label: "My Lessons", icon: "📚" },
      { to: "/dashboard/my-favorites", label: "My Favorites", icon: "❤" },
      { to: "/dashboard/profile", label: "Profile", icon: "👤" },
    ];

    const adminMenu = [
      { to: "/dashboard/admin", label: "Admin Overview", icon: "🛡️" },
      { to: "/dashboard/admin/manage-users", label: "Manage Users", icon: "👥" },
      { to: "/dashboard/admin/manage-lessons", label: "Manage Lessons", icon: "🧾" },
      { to: "/dashboard/admin/reported-lessons", label: "Reported Lessons", icon: "🚩" },
      { to: "/dashboard/admin/profile", label: "Admin Profile", icon: "🧑" },
    ];

    return isAdmin ? adminMenu : userMenu;
  }, [isAdmin]);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[linear-gradient(90deg,#f6f2ff_0%,#fdf7f2_30%,#f1f9ff_60%,#eef6f3_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="rounded-4xl bg-white/40 p-8 shadow-sm backdrop-blur">
            <p className="text-sm font-extrabold text-slate-700">
              <LottieLoader />
              Loading dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(90deg,#f6f2ff_0%,#fdf7f2_30%,#f1f9ff_60%,#eef6f3_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          {/* Desktop sidebar */}
          <div className="hidden overflow-hidden rounded-4xl bg-white/40 shadow-sm backdrop-blur lg:block">
            <Sidebar
              user={user}
              isAdmin={isAdmin}
              isPremium={isPremium}
              menu={menu}
              onLogout={handleLogout}
            />
          </div>

          {/* Content */}
          <div className="overflow-hidden rounded-4xl bg-white/40 shadow-sm backdrop-blur">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/30 px-4 py-3">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-white/85 lg:hidden"
                type="button"
              >
                ☰ Menu
              </button>

              <NavLink
                to="/"
                className="rounded-2xl bg-white/70 px-4 py-2 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-white/85"
              >
                ← Back to Home
              </NavLink>
            </div>

            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[86%] max-w-sm overflow-hidden bg-white/70 shadow-2xl backdrop-blur"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <Sidebar
                user={user}
                isAdmin={isAdmin}
                isPremium={isPremium}
                menu={menu}
                mobile
                onClose={() => setOpen(false)}
                onLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
