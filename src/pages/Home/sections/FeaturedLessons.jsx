import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedLessons } from "../../../api/home";
import LottieLoader from "../../../components/LottieLoader";

export default function FeaturedLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getFeaturedLessons();
        if (!ignore) setLessons(Array.isArray(data) ? data : []);
      } catch {
        if (!ignore) setLessons([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => (ignore = true);
  }, []);

  return (
    <section className="bg-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Featured Life Lessons
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Selected by admin (Manage Lessons → Featured).
            </p>
          </div>

          <Link
            to="/public-lessons"
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="mt-6"><LottieLoader /></div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((l) => (
              <div
                key={l._id}
                className="group rounded-3xl border border-white/50 bg-white/70 p-6 shadow-sm backdrop-blur
                           transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-extrabold text-slate-600">
                  {l.tone} • {l.category}
                </p>

                <h3 className="mt-2 text-lg font-extrabold text-slate-900 line-clamp-2">
                  {l.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-slate-600 line-clamp-3">
                  {l.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
                    {(l.accessLevel || "free").toUpperCase()}
                  </span>

                  <Link
                    to="/public-lessons"
                    className="text-sm font-extrabold text-indigo-700 transition group-hover:underline"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && lessons.length === 0 && (
          <div className="mt-6 rounded-3xl bg-white/70 p-6 text-center shadow-sm">
            <p className="text-sm font-extrabold text-slate-900">No featured lessons yet.</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Admin can mark lessons as featured from Manage Lessons.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
