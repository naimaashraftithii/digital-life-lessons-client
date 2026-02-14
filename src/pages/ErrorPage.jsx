import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();
  const msg = err?.message || "Something went wrong";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl bg-white p-8 shadow-sm border">
        <h1 className="text-2xl font-extrabold text-slate-900">Unexpected error</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">{msg}</p>
        <div className="mt-6 flex gap-2">
          <Link to="/" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white">
            Go Home
          </Link>
          <Link to="/dashboard" className="rounded-xl border bg-white px-4 py-2 text-sm font-extrabold text-slate-900">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
