import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import { getFeaturedLessons } from "../../../api/home";

export default function FeaturedLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getFeaturedLessons();
        if (!ignore) setLessons(Array.isArray(data) ? data.filter(Boolean) : []);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load featured lessons");
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
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Life Lessons</h2>
            <p className="mt-2 text-sm text-slate-600">Selected by admin (Manage Lessons → Featured).</p>
          </div>

          <Link
            to="/public-lessons"
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
          >
            View all →
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
              {lessons.map((l) => (
                <div
                  key={l?._id}
                  className="group rounded-3xl border border-white/50 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-extrabold text-slate-600">
                    {(l?.tone || "Tone")} • {(l?.category || "Category")}
                  </p>

                  <h3 className="mt-2 text-lg font-extrabold text-slate-900 line-clamp-2">
                    {l?.title || "Untitled"}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-slate-600 line-clamp-3">
                    {l?.description || "No description"}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
                      {(l?.accessLevel || "free").toUpperCase()}
                    </span>

                    <Link
                      to={`/lesson/${l?._id}`}
                      className="text-sm font-extrabold text-indigo-700 transition group-hover:underline"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {lessons.length === 0 && (
              <div className="mt-6 rounded-3xl bg-white/70 p-6 text-center shadow-sm">
                <p className="text-sm font-extrabold text-slate-900">No featured lessons yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
