import { useEffect, useState } from "react";
import LottieLoader from "../../../components/LottieLoader";
import { getTopContributors } from "../../../api/home";

const FALLBACK_AVATAR = "https://i.ibb.co/ZxK3f6K/user.png";

export default function TopContributors() {
  const [users, setUsers] = useState([]);
  const [label, setLabel] = useState("Top Contributors of the Week");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        // 1) last 7 days
        let data = await getTopContributors(7);
        data = Array.isArray(data) ? data.filter(Boolean) : [];

        // 2) fallback all-time if empty
        if (data.length === 0) {
          const all = await getTopContributors(0); // days=0 => all-time
          data = Array.isArray(all) ? all.filter(Boolean) : [];
          if (!ignore) setLabel("All-time Top Contributors");
        } else {
          if (!ignore) setLabel("Top Contributors of the Week");
        }

        if (!ignore) setUsers(data);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load contributors");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => (ignore = true);
  }, []);

  return (
    <section className="bg-gradient-to-b from-amber-50 via-white to-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">{label}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Based on lessons created in the last 7 days (auto fallback to all-time).
            </p>
          </div>

          {loading && (
            <div className="mt-6">
              <LottieLoader />
            </div>
          )}

          {err && (
            <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {err}
            </div>
          )}

          {!loading && !err && (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((u) => (
                  <div
                    key={u?.uid || u?.email}
                    className="group rounded-3xl border border-white/60 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={u?.photoURL || FALLBACK_AVATAR}
                        onError={(e) => (e.currentTarget.src = FALLBACK_AVATAR)}
                        alt={u?.name || "User"}
                        className="h-12 w-12 rounded-2xl object-cover shadow-sm"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-slate-900">
                          {u?.name || "Unknown"}
                        </p>
                        <p className="text-xs font-semibold text-slate-600">
                          {u?.lessons || 0} lessons
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-amber-400 transition-all"
                        style={{ width: `${Math.min(100, (u?.lessons || 0) * 8)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {users.length === 0 && (
                <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-center">
                  <p className="text-sm font-extrabold text-slate-900">No contributors yet</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    Create lessons to appear here.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
