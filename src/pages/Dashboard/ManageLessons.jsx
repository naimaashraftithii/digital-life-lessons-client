// src/pages/Dashboard/ManageLessons.jsx
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LottieLoader from "../../components/LottieLoader";
import {
  adminDeleteLesson,
  adminGetLessons,
  adminToggleFeatured,
  adminToggleReviewed,
} from "../../api/admin";

export default function ManageLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [featured, setFeatured] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminGetLessons({ search, visibility, accessLevel, featured });
      setLessons(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e?.message || "Failed to load lessons");
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCount = useMemo(() => lessons.length, [lessons]);

  const toggleFeatured = async (id, current) => {
    try {
      await adminToggleFeatured(id, !current);
      toast.success(!current ? "Marked as Featured ✅" : "Removed Featured ✅");
      await load();
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };

  const toggleReviewed = async (id, current) => {
    try {
      await adminToggleReviewed(id, !current);
      toast.success(!current ? "Marked Reviewed ✅" : "Unreviewed ✅");
      await load();
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };

  const removeLesson = async (id) => {
    const ok = await Swal.fire({
      icon: "warning",
      title: "Delete lesson?",
      text: "This will permanently delete the lesson.",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!ok.isConfirmed) return;

    try {
      await adminDeleteLesson(id);
      toast.success("Lesson deleted ✅");
      await load();
    } catch (e) {
      toast.error(e?.message || "Failed to delete");
    }
  };

  if (loading) return <LottieLoader />;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Manage Lessons</h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Feature lessons, mark reviewed, and delete inappropriate content.
          </p>
          <p className="mt-1 text-xs font-extrabold text-slate-500">
            Showing: {filteredCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title/description..."
          className="w-full rounded-xl border px-4 py-2 text-sm font-semibold"
        />

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 text-sm font-semibold"
        >
          <option value="">All visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 text-sm font-semibold"
        >
          <option value="">All access</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>

        <select
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
          className="w-full rounded-xl border px-4 py-2 text-sm font-semibold"
        >
          <option value="">Featured: all</option>
          <option value="true">Featured only</option>
          <option value="false">Not featured</option>
        </select>
      </div>

      <button
        onClick={load}
        className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
      >
        Apply Filters
      </button>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[1100px] w-full text-left text-sm">
          <thead>
            <tr className="border-b text-xs font-extrabold uppercase text-slate-600">
              <th className="py-3 pr-3">Title</th>
              <th className="py-3 pr-3">Creator</th>
              <th className="py-3 pr-3">Visibility</th>
              <th className="py-3 pr-3">Access</th>
              <th className="py-3 pr-3">Featured</th>
              <th className="py-3 pr-3">Reviewed</th>
              <th className="py-3 pr-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((l) => {
              const id = l._id;
              return (
                <tr key={id} className="border-b last:border-0">
                  <td className="py-3 pr-3">
                    <p className="font-extrabold text-slate-900">{l.title}</p>
                    <p className="text-xs font-semibold text-slate-500 line-clamp-1">
                      {l.description}
                    </p>
                  </td>

                  {/* ✅ FIXED CREATOR CELL */}
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          l?.creator?.photoURL ||
                          l?.creator?.photoUrl ||
                          "https://i.ibb.co/ZxK3f6K/user.png"
                        }
                        onError={(e) =>
                          (e.currentTarget.src = "https://i.ibb.co/ZxK3f6K/user.png")
                        }
                        alt="creator"
                        className="h-9 w-9 rounded-2xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">
                          {l?.creator?.name || "Unknown"}
                        </p>
                        <p className="text-xs font-semibold text-slate-500">
                          {l?.creator?.email || ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 pr-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
                      {(l.visibility || "public").toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 pr-3">
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-extrabold",
                        l.accessLevel === "premium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-indigo-100 text-indigo-700",
                      ].join(" ")}
                    >
                      {(l.accessLevel || "free").toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 pr-3">
                    <button
                      onClick={() => toggleFeatured(id, !!l.isFeatured)}
                      className={[
                        "rounded-xl px-3 py-2 text-xs font-extrabold",
                        l.isFeatured
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700",
                      ].join(" ")}
                    >
                      {l.isFeatured ? "Featured ✅" : "Make Featured"}
                    </button>
                  </td>

                  <td className="py-3 pr-3">
                    <button
                      onClick={() => toggleReviewed(id, !!l.isReviewed)}
                      className={[
                        "rounded-xl px-3 py-2 text-xs font-extrabold",
                        l.isReviewed
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700",
                      ].join(" ")}
                    >
                      {l.isReviewed ? "Reviewed ✅" : "Mark Reviewed"}
                    </button>
                  </td>

                  <td className="py-3 pr-3">
                    <button
                      onClick={() => removeLesson(id)}
                      className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-extrabold text-rose-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {lessons.length === 0 && (
              <tr>
                <td colSpan="7" className="py-10 text-center font-semibold text-slate-500">
                  No lessons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
