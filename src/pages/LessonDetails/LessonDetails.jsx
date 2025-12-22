import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import { getLessonById } from "../../api/lessons";

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getLessonById(id); // ✅ real API
        if (!ignore) setLesson(data);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load lesson");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading || planLoading) return <LottieLoader />;

  if (err) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl bg-white p-6 shadow-sm text-center">
          <h2 className="text-xl font-extrabold text-slate-900">Error</h2>
          <p className="mt-2 text-sm text-slate-600">{err}</p>
          <Link
            to="/public-lessons"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white"
          >
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl bg-white p-6 shadow-sm text-center">
          <h2 className="text-xl font-extrabold text-slate-900">Lesson not found</h2>
          <p className="mt-2 text-sm text-slate-600">
            This lesson doesn’t exist or was removed.
          </p>
          <Link
            to="/public-lessons"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white"
          >
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  const locked = lesson.accessLevel === "premium" && !plan?.isPremium;

  if (locked) {
    return <Navigate to="/pricing" replace state={{ from: `/lesson/${id}` }} />;
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">{lesson.title}</h1>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              {(lesson.accessLevel || "free").toUpperCase()}
            </span>
          </div>

          <p className="mt-3 text-slate-700">{lesson.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <img
              src={lesson?.creator?.photoURL || lesson?.creator?.photo || "https://i.ibb.co/ZxK3f6K/user.png"}
              alt="creator"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">
                {lesson?.creator?.name || lesson?.creator?.displayName || "Unknown"}
              </p>
              <p className="text-xs text-slate-500">
                {lesson.createdAt ? new Date(lesson.createdAt).toLocaleString() : ""}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/public-lessons" className="text-sm font-bold text-primary hover:underline">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonDetails;
