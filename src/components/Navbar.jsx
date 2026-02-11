import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";

const FALLBACK_AVATAR = "https://i.ibb.co/ZxK3f6K/user.png";

const linkClass = ({ isActive }) =>
  "rounded-xl px-3 py-2 text-sm font-extrabold transition " +
  (isActive
    ? "bg-slate-900 text-white"
    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900");

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useAuth();
  const { plan, loading, refetch, error } = useUserPlan(user?.uid);

  // ✅ safe for both shapes
  const isPremium = Boolean(plan?.isPremium ?? plan?.user?.isPremium);
  const role = plan?.role ?? plan?.user?.role ?? "user";
  const isAdmin = role === "admin";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ refetch on route change (after payment success, etc.)
  useEffect(() => {
    if (user?.uid) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, user?.uid]);

  // close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setMenuOpen(false);
      setMobileOpen(false);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white">
            DL
          </span>
          <span className="hidden sm:block">Digital Life Lessons</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/public-lessons" className={linkClass}>Public Lessons</NavLink>
          <NavLink to="/pricing" className={linkClass}>Pricing</NavLink>

          {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          {user && isAdmin && <NavLink to="/dashboard/admin" className={linkClass}>Admin</NavLink>}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* ✅ Free => Upgrade */}
          {user && !loading && !isPremium && (
            <button
              onClick={() => navigate("/pricing")}
              className="hidden rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white md:inline-flex"
              type="button"
            >
              Upgrade ⭐
            </button>
          )}

          {/* ✅ Premium => Premium */}
          {user && !loading && isPremium && (
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="hidden rounded-xl bg-amber-100 px-3 py-2 text-xs font-extrabold text-amber-800 md:inline-flex"
              type="button"
            >
              Premium 👑
            </button>
          )}

          {/* Logged out */}
          {!user ? (
            <div className="hidden items-center gap-2 md:flex">
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/register" className={linkClass}>Register</NavLink>
            </div>
          ) : (
            /* Logged in dropdown */
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="relative inline-flex items-center gap-2 rounded-2xl border bg-white px-2 py-1.5 shadow-sm hover:bg-slate-50"
                type="button"
              >
                <div className="relative">
                  <img
                    src={user?.photoURL || FALLBACK_AVATAR}
                    alt="Profile"
                    className="h-9 w-9 rounded-2xl object-cover"
                  />
                  {!loading && isPremium && (
                    <span className="absolute -right-2 -top-2 rounded-xl bg-amber-100 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-800 shadow">
                      👑
                    </span>
                  )}
                </div>

                <div className="hidden text-left md:block">
                  <p className="max-w-[140px] truncate text-xs font-extrabold text-slate-900">
                    {user?.displayName || "User"}
                  </p>
                  <p className="max-w-[140px] truncate text-[10px] font-bold text-slate-500">
                    {user?.email || ""}
                  </p>
                </div>

                <span className="hidden text-xs font-extrabold text-slate-500 md:block">▾</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">
                  <button
                    onClick={() => { setMenuOpen(false); navigate("/dashboard/profile"); }}
                    className="w-full px-4 py-3 text-left text-sm font-extrabold text-slate-800 hover:bg-slate-50"
                    type="button"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => refetch()}
                    className="w-full px-4 py-3 text-left text-sm font-extrabold text-slate-800 hover:bg-slate-50"
                    type="button"
                  >
                    Refresh premium status
                  </button>

                  {error && (
                    <div className="px-4 pb-3 text-xs font-bold text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="h-px bg-slate-100" />

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm font-extrabold text-red-600 hover:bg-red-50"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button (now mobileOpen is USED ✅) */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex rounded-xl border bg-white px-3 py-2 text-xs font-extrabold text-slate-800 shadow-sm md:hidden"
            type="button"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-white/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="grid gap-2">
              <NavLink onClick={() => setMobileOpen(false)} to="/" className={linkClass}>Home</NavLink>
              <NavLink onClick={() => setMobileOpen(false)} to="/public-lessons" className={linkClass}>Public Lessons</NavLink>
              <NavLink onClick={() => setMobileOpen(false)} to="/pricing" className={linkClass}>Pricing</NavLink>

              {user ? (
                <>
                  <NavLink onClick={() => setMobileOpen(false)} to="/dashboard" className={linkClass}>Dashboard</NavLink>
                  <NavLink onClick={() => setMobileOpen(false)} to="/dashboard/profile" className={linkClass}>Profile</NavLink>
                  {isAdmin && (
                    <NavLink onClick={() => setMobileOpen(false)} to="/dashboard/admin" className={linkClass}>Admin</NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="rounded-xl border px-3 py-2 text-left text-sm font-extrabold text-red-600 hover:bg-red-50"
                    type="button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink onClick={() => setMobileOpen(false)} to="/login" className={linkClass}>Login</NavLink>
                  <NavLink onClick={() => setMobileOpen(false)} to="/register" className={linkClass}>Register</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
