import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import lessonsData from "../../data/lessons.json";
import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";

const PublicLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mock API delay
    const t = setTimeout(() => {
      setLessons(lessonsData);
      setLoading(false);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  if (loading) return <LottieLoader />;

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Public Life Lessons
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Explore wisdom shared by the community.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const isLocked =
              lesson.accessLevel === "premium" && !user?.isPremium;

            return (
              <div
                key={lesson._id}
                className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Premium overlay */}
                {isLocked && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur">
                    <span className="text-2xl">🔒</span>
                    <p className="mt-2 text-sm font-bold text-slate-800">
                      Premium Lesson
                    </p>
                    <Link
                      to="/pricing"
                      className="mt-2 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-white"
                    >
                      Upgrade to view
                    </Link>
                  </div>
                )}

                <div className={isLocked ? "blur-sm" : ""}>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900">
                      {lesson.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-indigo-100 px-2 py-1 font-semibold text-indigo-700">
                        {lesson.category}
                      </span>
                      <span className="rounded-full bg-amber-100 px-2 py-1 font-semibold text-amber-700">
                        {lesson.emotionalTone}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">
                        {lesson.accessLevel.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={lesson.creator.photo}
                        alt={lesson.creator.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {lesson.creator.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {lesson.createdAt}
                        </p>
                      </div>
                    </div>

                    {!isLocked && (
                      <div className="mt-4">
                        <Link
                          to={`/lesson/${lesson._id}`}
                          className="text-sm font-bold text-primary hover:underline"
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
      </div>
    </section>
  );
};

export default PublicLessons;
