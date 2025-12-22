import { useEffect, useState } from "react";
import { getTopContributors } from "../../../api/home";
import LottieLoader from "../../../components/LottieLoader";

export default function TopContributors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getTopContributors();
        if (!ignore) setUsers(Array.isArray(data) ? data : []);
      } catch {
        if (!ignore) setUsers([]);
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
            <h3 className="text-xl font-extrabold text-slate-900">
              Top Contributors of the Week
            </h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Chart by last 7 days lessons count.
            </p>
          </div>

          {loading ? (
            <div className="mt-6"><LottieLoader /></div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((u) => (
                <div
                  key={u.uid}
                  className="group rounded-3xl border border-white/60 bg-white p-5 shadow-sm
                             transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={u.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                      alt={u.name}
                      className="h-12 w-12 rounded-2xl object-cover shadow-sm"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-slate-900">
                        {u.name}
                      </p>
                      <p className="text-xs font-semibold text-slate-600">
                        {u.lessons} lessons
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-amber-400 transition-all"
                      style={{ width: `${Math.min(100, u.lessons * 8)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-center">
              <p className="text-sm font-extrabold text-slate-900">No contributors yet</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Create lessons to appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
