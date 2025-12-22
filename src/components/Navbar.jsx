import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";
import GradientButton from "./GradientButton";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const { plan } = useUserPlan(user?.uid);
  const isPremium = !!plan?.isPremium;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navLinkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-white/70 text-slate-900 shadow-sm"
        : "text-slate-700 hover:bg-white/50"
    }`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out!");
      setDropOpen(false);
      setMobileOpen(false);
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Logout failed");
    }
  };

  const renderNavItems = () => (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>
        Home
      </NavLink>

      <NavLink
        to="/public-lessons"
        className={navLinkClass}
        onClick={() => setMobileOpen(false)}
      >
        Public Lessons
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/dashboard/add-lesson"
            className={navLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Add Lesson
          </NavLink>

          <NavLink
            to="/dashboard/my-lessons"
            className={navLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            My Lessons
          </NavLink>

          {!isPremium && (
            <NavLink
              to="/pricing"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </NavLink>
          )}

          {isPremium && (
            <span className="rounded-xl bg-amber-100 px-3 py-2 text-xs font-bold text-amber-700">
              Premium ⭐
            </span>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-slate-900 font-extrabold shadow-sm">
            DL
          </div>
          <div className="leading-tight">
            <p className="text-base font-bold text-slate-900">Digital Life Lessons</p>
            <p className="text-xs text-slate-600">Capture. Reflect. Grow.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">{renderNavItems()}</nav>

        <div className="flex items-center gap-2">
          {!user && (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login">
                <GradientButton variant="greenBlue" className="px-4 py-2 text-sm">
                  Login
                </GradientButton>
              </Link>
              <Link to="/register">
                <GradientButton variant="bluePink" className="px-4 py-2 text-sm">
                  Sign up
                </GradientButton>
              </Link>
            </div>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-2 rounded-2xl bg-white/60 px-2 py-1 shadow-sm hover:bg-white/70"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                  alt="User"
                  className="h-9 w-9 rounded-2xl object-cover"
                />
                <span className="hidden text-sm font-semibold text-slate-800 md:inline">
                  {user.displayName || "User"}
                </span>
              </button>

              {dropOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-lg backdrop-blur">
                  <div className="px-4 py-3">
                    <p className="text-sm font-bold text-slate-900">
                      {user.displayName || "Anonymous"}
                    </p>
                    <p className="text-xs text-slate-600">{user.email}</p>
                  </div>

                  <div className="h-px bg-slate-200/70" />

                  <div className="p-2">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setDropOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setDropOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Dashboard
                    </Link>

                    {!isPremium && (
                      <Link
                        to="/pricing"
                        onClick={() => setDropOpen(false)}
                        className="mt-1 block rounded-xl px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
                      >
                        Upgrade
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 shadow-sm md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/30 bg-white/30 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-2">
              {renderNavItems()}

              {!user && (
                <div className="mt-2 flex gap-2">
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <GradientButton variant="greenBlue" className="w-full">
                      Login
                    </GradientButton>
                  </Link>

                  <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <GradientButton variant="bluePink" className="w-full">
                      Sign up
                    </GradientButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
