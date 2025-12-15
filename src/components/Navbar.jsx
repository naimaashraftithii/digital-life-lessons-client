import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // TODO: replace with real auth state later
  const user = null; // or mock user object
  const isPremium = false;

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-full transition
     ${isActive ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100"}`;

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white font-bold">
            DL
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight">
              Digital Life Lessons
            </p>
            <p className="text-xs text-slate-500">
              Capture. Reflect. Grow.
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/public-lessons" className={navLinkClass}>
            Public Lessons
          </NavLink>

          {/* These will redirect later to /dashboard/... */}
          <NavLink to="/dashboard/add-lesson" className={navLinkClass}>
            Add Lesson
          </NavLink>
          <NavLink to="/dashboard/my-lessons" className={navLinkClass}>
            My Lessons
          </NavLink>

          {!isPremium && user && (
            <NavLink to="/pricing" className={navLinkClass}>
              Pricing / Upgrade
            </NavLink>
          )}

          {isPremium && user && (
            <span className="ml-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Premium ⭐
            </span>
          )}
        </nav>

        {/* Auth Area */}
        <div className="flex items-center gap-3">
          {!user && (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/login"
                className="rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* User dropdown mock — real logic later */}
          {user && (
            <button className="flex items-center gap-2 rounded-full border px-2 py-1 hover:bg-slate-50">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-sm font-medium md:inline">
                {user.displayName || "Profile"}
              </span>
            </button>
          )}

          {/* Mobile menu icon – functional later */}
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-slate-600 md:hidden">
            <span className="sr-only">Open menu</span>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
