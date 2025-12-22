import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getMyLessons } from "../../api/lessons";

const MyLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const reqIdRef = useRef(0);

  useEffect(() => {
    if (!user?.uid) {
      setLessons([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const myReqId = ++reqIdRef.current;

    const run = async () => {
      try {
        setLoading(true);
        const data = await getMyLessons(user.uid);

        if (cancelled || reqIdRef.current !== myReqId) return;
        setLessons(data);
      } catch (e) {
        if (cancelled || reqIdRef.current !== myReqId) return;
        toast.error(e?.message || "Failed to load lessons");
      } finally {
        if (cancelled || reqIdRef.current !== myReqId) return;
        setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  if (loading) {
    return <div className="rounded-2xl bg-white p-6 shadow-sm">Loading...</div>;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-xl font-extrabold text-slate-900">My Lessons</h1>

      {lessons.length === 0 ? (
        <p className="text-sm text-slate-500">You haven’t created any lessons yet.</p>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow"
            >
              <h3 className="font-bold text-slate-900">{lesson.title}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {lesson.category} • {lesson.accessLevel}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLessons;
