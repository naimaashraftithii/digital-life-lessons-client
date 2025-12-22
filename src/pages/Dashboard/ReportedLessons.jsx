import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LottieLoader from "../../components/LottieLoader";
import { deleteLessonAdmin, getReportedLessons, ignoreReports } from "../../api/admin";

export default function ReportedLessons() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null); 

  const load = async () => {
    try {
      setLoading(true);
      const data = await getReportedLessons();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDeleteLesson = async (lessonId) => {
    const ok = window.confirm("Delete this lesson permanently?");
    if (!ok) return;

    try {
      await deleteLessonAdmin(lessonId);
      toast.success("Lesson deleted ✅");
      setRows((prev) => prev.filter((x) => x.lessonId !== lessonId));
    } catch (e) {
      toast.error(e.message || "Failed to delete");
    }
  };

  const onIgnore = async (lessonId) => {
    const ok = window.confirm("Ignore reports for this lesson (clear reports)?");
    if (!ok) return;

    try {
      await ignoreReports(lessonId);
      toast.success("Reports cleared ✅");
      setRows((prev) => prev.filter((x) => x.lessonId !== lessonId));
      setOpen(null);
    } catch (e) {
      toast.error(e.message || "Failed to clear reports");
    }
  };

  if (loading) return <LottieLoader />;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-extrabold text-slate-900">Reported Lessons</h1>
      <p className="mt-1 text-sm font-semibold text-slate-600">
        Table + modal reasons + actions.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr className="border-b">
              <th className="py-3 pr-3 font-extrabold">Lesson</th>
              <th className="py-3 pr-3 font-extrabold">Creator</th>
              <th className="py-3 pr-3 font-extrabold">Reports</th>
              <th className="py-3 pr-3 font-extrabold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.lessonId} className="border-b last:border-b-0">
                <td className="py-3 pr-3 font-bold text-slate-900">
                  {r.lesson?.title || "Lesson missing"}
                </td>
                <td className="py-3 pr-3">
                  {r.lesson?.creator?.name || "Unknown"}
                </td>
                <td className="py-3 pr-3">
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-extrabold text-rose-700">
                    {r.reportCount}
                  </span>
                </td>
                <td className="py-3 pr-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setOpen(r.lessonId)}
                    className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-extrabold text-white"
                    type="button"
                  >
                    View reasons
                  </button>

                  <button
                    onClick={() => onDeleteLesson(r.lessonId)}
                    className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-extrabold text-rose-700"
                    type="button"
                  >
                    Delete lesson
                  </button>

                  <button
                    onClick={() => onIgnore(r.lessonId)}
                    className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-slate-700"
                    type="button"
                  >
                    Ignore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!rows.length && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
            <p className="font-extrabold text-slate-900">No reported lessons</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">Report reasons</h3>
              <button
                onClick={() => setOpen(null)}
                className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-extrabold"
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 max-h-[60vh] overflow-auto">
              {(rows.find((x) => x.lessonId === open)?.reasons || []).map((x, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-extrabold text-slate-900">{x.reason}</p>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Reporter: {x.reporterEmail || x.reporterUid || "Unknown"} •{" "}
                    {x.createdAt ? new Date(x.createdAt).toLocaleString() : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => onIgnore(open)}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-extrabold text-slate-700"
                type="button"
              >
                Ignore (clear reports)
              </button>
              <button
                onClick={() => onDeleteLesson(open)}
                className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-extrabold text-white"
                type="button"
              >
                Delete lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
