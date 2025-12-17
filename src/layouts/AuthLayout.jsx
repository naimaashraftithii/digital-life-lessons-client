import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/" className="text-sm font-semibold text-primary">
          ← Back to Home
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* left image (hidden on small screens) */}
          <div className="hidden overflow-hidden rounded-3xl bg-white shadow-sm lg:block">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80"
              alt="Learning"
              className="h-full w-full object-cover"
            />
          </div>

          {/* form area */}
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
