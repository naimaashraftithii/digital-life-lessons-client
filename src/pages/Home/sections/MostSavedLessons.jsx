import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import { getMostSavedLessons } from "../../../api/home";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=80";

export default function MostSavedLessons() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getMostSavedLessons();
        if (!ignore) setRows(Array.isArray(data) ? data.filter(Boolean) : []);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load most saved");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => (ignore = true);
  }, []);

  // ✅ backend should return [{ lessonId, saves, lesson: {...} }]
  const safeRows = useMemo(() => (rows || []).filter((r) => r && r.lesson), [rows]);

  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Most Saved Lessons</h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Ranked by favorites count.
              </p>
            </div>

            <Link
              to="/public-lessons"
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
            >
              Explore more →
            </Link>
          </div>

          {loading && <div className="mt-6"><LottieLoader /></div>}

          {err && (
            <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {err}
            </div>
          )}

          {!loading && !err && (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {safeRows.map((r) => {
                  const l = r.lesson;
                  return (
                    <div
                      key={r.lessonId || l._id}
                      className="group overflow-hidden rounded-3xl border border-white/60 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative">
                        <img
                          src={l?.photoUrl || l?.image || FALLBACK_IMG}
                          alt={l?.title || "Lesson"}
                          className="h-44 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <p className="text-xs font-extrabold text-white/95">
                            🔖 {r?.saves || 0} saves
                          </p>
                        </div>
                      </div>

                      <div className="p-5">
                        <h4 className="text-lg font-extrabold text-slate-900 line-clamp-2">
                          {l?.title || "Untitled lesson"}
                        </h4>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full bg-indigo-100 px-3 py-1 font-extrabold text-indigo-700">
                            {l?.category || "General"}
                          </span>
                          <span className="rounded-full bg-amber-100 px-3 py-1 font-extrabold text-amber-700">
                            {l?.tone || "Neutral"}
                          </span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 font-extrabold text-slate-700">
                            {(l?.accessLevel || "free").toUpperCase()}
                          </span>
                        </div>

                        <div className="mt-4">
                          <Link
                            to={`/lesson/${l._id}`}
                            className="text-sm font-extrabold text-indigo-700 transition group-hover:underline"
                          >
                            See details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {safeRows.length === 0 && (
                <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-center">
                  <p className="text-sm font-extrabold text-slate-900">No saves yet</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    People will save lessons and they’ll appear here.
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
