// src/pages/Dashboard/MyLessons.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import LottieLoader from "../../components/LottieLoader";
import useUserPlan from "../../hooks/useUserPlan";
import { getMyLessons, deleteLesson } from "../../api/lessons";
import { toggleFavorite } from "../../api/favorites";

export default function MyLessons() {
  const { user } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const reqIdRef = useRef(0);

  const load = async () => {
    if (!user?.uid) {
      setLessons([]);
      setLoading(false);
      return;
    }

    const myReqId = ++reqIdRef.current;

    try {
      setLoading(true);
      const data = await getMyLessons(user.uid);
      if (reqIdRef.current !== myReqId) return;
      setLessons(Array.isArray(data) ? data : []);
    } catch (e) {
      if (reqIdRef.current !== myReqId) return;
      toast.error(e?.message || "Failed to load lessons");
      setLessons([]);
    } finally {
      if (reqIdRef.current === myReqId) setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const onDelete = async (id) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      await deleteLesson(id);
      toast.success("Deleted ✅");
      await load(); // ✅ refresh
    } catch (e) {
      toast.error(e?.message || "Failed to delete");
    }
  };

  const onToggleFavorite = async (id) => {
    try {
      await toggleFavorite(user.uid, id);
      toast.success("Toggled favorite ✅");
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };

  if (loading || planLoading) return <LottieLoader />;

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Lessons</h1>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Manage lessons you created.
          </p>
        </div>

        <Link
          to="/dashboard/add-lesson"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
        >
          + Add Lesson
        </Link>
      </div>

      {!lessons.length ? (
        <div className="mt-6 rounded-2xl bg-white border p-6 text-center">
          <p className="font-extrabold text-slate-900">No lessons yet</p>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Create your first lesson from “Add Lesson”.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white border">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-600 border-b">
              <tr>
                <th className="py-3 px-4 font-extrabold">Title</th>
                <th className="py-3 px-4 font-extrabold">Visibility</th>
                <th className="py-3 px-4 font-extrabold">Access</th>
                <th className="py-3 px-4 font-extrabold">Likes</th>
                <th className="py-3 px-4 font-extrabold">Created</th>
                <th className="py-3 px-4 font-extrabold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((l) => (
                <tr key={l._id} className="border-b last:border-b-0">
                  <td className="py-3 px-4 font-extrabold text-slate-900">
                    {l.title}
                    <div className="text-xs font-semibold text-slate-500">
                      {l.category || "General"} • {l.tone || l.emotionalTone || "Neutral"}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
                      {(l.visibility || "public").toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700">
                      {(l.accessLevel || "free").toUpperCase()}
                    </span>
                    {l.accessLevel === "premium" && !plan?.isPremium && (
                      <div className="text-[11px] font-bold text-rose-600 mt-1">
                        Premium locked (you are free)
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 font-bold text-slate-700">
                    {l.likesCount || 0}
                  </td>

                  <td className="py-3 px-4 text-slate-600">
                    {l.createdAt ? new Date(l.createdAt).toLocaleDateString() : ""}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/lesson/${l._id}`}
                        className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-extrabold text-white"
                      >
                        Details
                      </Link>

                      <button
                        onClick={() => onToggleFavorite(l._id)}
                        className="rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-700"
                        type="button"
                      >
                        🔖 Toggle Save
                      </button>

                      <button
                        onClick={() => onDelete(l._id)}
                        className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-extrabold text-rose-700"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
