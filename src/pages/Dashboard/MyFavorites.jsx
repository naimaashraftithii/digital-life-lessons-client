// src/pages/dashboard/MyFavorites.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import LottieLoader from "../../components/LottieLoader";
import { getFavorites, toggleFavorite } from "../../api/favorites";
import { getLessonById } from "../../api/lessons";

export default function MyFavorites() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      // ✅ server returns [{ uid, lessonId, createdAt }]
      const favs = await getFavorites(user?.uid);

      const favArr = Array.isArray(favs) ? favs : [];
      const lessonIds = favArr.map((f) => f.lessonId).filter(Boolean);

      // ✅ fetch lesson details
      const lessons = await Promise.all(
        lessonIds.map(async (id) => {
          try {
            return await getLessonById(id);
          } catch {
            return null;
          }
        })
      );

      setRows(lessons.filter(Boolean));
    } catch (e) {
      toast.error(e.message || "Failed to load favorites");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.uid) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const onRemove = async (lessonId) => {
    try {
      await toggleFavorite(user.uid, lessonId);
      toast.success("Removed from favorites");
      setRows((prev) => prev.filter((x) => x._id !== lessonId));
    } catch (e) {
      toast.error(e.message || "Failed to remove");
    }
  };

  if (loading) return <LottieLoader />;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-extrabold text-slate-900">My Favorites</h1>
      <p className="mt-1 text-sm font-semibold text-slate-600">
        Saved lessons list (table view).
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr className="border-b">
              <th className="py-3 pr-3 font-extrabold">Title</th>
              <th className="py-3 pr-3 font-extrabold">Category</th>
              <th className="py-3 pr-3 font-extrabold">Tone</th>
              <th className="py-3 pr-3 font-extrabold">Access</th>
              <th className="py-3 pr-3 font-extrabold">Created</th>
              <th className="py-3 pr-3 font-extrabold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((l) => (
              <tr key={l._id} className="border-b last:border-b-0">
                <td className="py-3 pr-3 font-bold text-slate-900">{l.title}</td>
                <td className="py-3 pr-3">{l.category}</td>
                <td className="py-3 pr-3">{l.tone}</td>
                <td className="py-3 pr-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
                    {(l.accessLevel || "free").toUpperCase()}
                  </span>
                </td>
                <td className="py-3 pr-3">
                  {l.createdAt ? new Date(l.createdAt).toLocaleDateString() : ""}
                </td>
                <td className="py-3 pr-3 flex flex-wrap gap-2">
                  <Link
                    to={`/lesson/${l._id}`}
                    className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-extrabold text-white"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => onRemove(l._id)}
                    className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-extrabold text-rose-700"
                    type="button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!rows.length && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
            <p className="font-extrabold text-slate-900">No favorites yet</p>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Save lessons from Public Lessons & Lesson Details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
