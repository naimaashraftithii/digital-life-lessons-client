import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(99,102,241,.25),transparent),radial-gradient(1200px_600px_at_90%_20%,rgba(236,72,153,.18),transparent),linear-gradient(180deg,#f8fafc,white)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* top */}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm font-extrabold text-indigo-600 hover:underline">
            ← Back to Home
          </Link>

          {/* top-bottom */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 font-extrabold text-slate-900 shadow-sm">
              DL
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-slate-900">Digital Life Lessons</p>
              <p className="text-[11px] font-semibold text-slate-600">Capture. Reflect. Grow.</p>
            </div>
          </Link>
        </div>

        {/* layout */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* left*/}
          <div className="hidden overflow-hidden rounded-4xl bg-white/70 shadow-sm backdrop-blur lg:block">
            <div className="relative h-full min-h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
                alt="Learning"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/70 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-extrabold text-slate-900">
                  Save your life lessons—before they fade.
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-600">
                  Reflect privately or share publicly with the community.
                </p>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="rounded-4xl bg-white/75 p-6 shadow-sm backdrop-blur sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
