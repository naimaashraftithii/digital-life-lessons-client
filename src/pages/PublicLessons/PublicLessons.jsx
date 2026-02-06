// src/pages/PublicLessons/PublicLessons.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import { getPublicLessonsWithMeta } from "../../api/lessons";

export default function PublicLessons() {
  const { user } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  const [lessons, setLessons] = useState([]);
  const [meta, setMeta] = useState({ total: 0, currentPage: 1, totalPages: 1 });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await getPublicLessonsWithMeta({ page, limit: 9 });

        if (!ignore) {
          setLessons(Array.isArray(res?.lessons) ? res.lessons : []);
          setMeta({
            total: Number(res?.total || 0),
            currentPage: Number(res?.currentPage || 1),
            totalPages: Number(res?.totalPages || 1),
          });
        }
      } catch (e) {
        if (!ignore) setErr(e?.message || "Failed to load lessons");
        if (!ignore) setLessons([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
    

  }, [page]);

 
  
  
  if (loading || planLoading) return <LottieLoader />;

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Public Life Lessons</h1>
            <p className="mt-2 text-sm text-slate-600">
              Showing {lessons.length} of {meta.total}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border bg-white px-3 py-1.5 text-sm font-bold disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className="text-sm font-bold">
              {meta.currentPage} / {meta.totalPages}
            </span>

            <button
              className="rounded-lg border bg-white px-3 py-1.5 text-sm font-bold disabled:opacity-50"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {err && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {err}
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(Array.isArray(lessons) ? lessons : []).map((lesson) => {
            const isLocked = lesson?.accessLevel === "premium" && !plan?.isPremium;

            return (
              <div
                key={lesson?._id}
                className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
               {
                 console.log(lesson)
               }
                {isLocked && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur">
                    <span className="text-2xl">🔒</span>
                    <p className="mt-2 text-sm font-bold text-slate-800">Premium Lesson</p>
                    <Link
                      to="/pricing"
                      className="mt-2 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white"
                    >
                      Upgrade to view
                    </Link>
                  </div>
                )}

                <div className={isLocked ? "blur-sm" : ""}>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900">{lesson?.title}</h3>

                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {lesson?.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-indigo-100 px-2 py-1 font-semibold text-indigo-700">
                        {lesson?.category || "General"}
                      </span>
                      <span className="rounded-full bg-amber-100 px-2 py-1 font-semibold text-amber-700">
                        {lesson?.tone || lesson?.emotionalTone || "Neutral"}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">
                        {(lesson?.accessLevel || "free").toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={lesson?.creator?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                        alt="creator"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {lesson?.creator?.name || "Unknown"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {lesson?.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : ""}
                        </p>
                      </div>
                    </div>

                    {!isLocked && (
                      <div className="mt-4">
                        <Link
                          to={`/lesson/${lesson._id}`}
                          className="text-sm font-bold text-indigo-700 hover:underline"
                        >
                          See details →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!lessons?.length && !err && (
          <div className="mt-10 rounded-2xl bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-extrabold text-slate-900">No public lessons yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
