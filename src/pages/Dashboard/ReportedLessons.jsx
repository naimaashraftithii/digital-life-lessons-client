import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LottieLoader from "../../components/LottieLoader";
import { getReportedLessons, ignoreReports, adminDeleteLesson } from "../../api/admin";

export default function ReportedLessons() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getReportedLessons();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.message || "Failed to load reports");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const showReasons = (r) => {
    const list = (r?.reports || [])
      .slice(0, 20)
      .map((x, i) => {
        const who = x.reporterEmail || x.reporterUid || "Anonymous";
        const reason = x.reason || "-";
        return `<li style="margin:6px 0"><b>${i + 1}.</b> ${reason}<br/><span style="opacity:.75;font-size:12px">${who}</span></li>`;
      })
      .join("");

    Swal.fire({
      title: "Report reasons",
      html: `<div style="text-align:left"><ul>${list || "<li>No reasons</li>"}</ul></div>`,
      confirmButtonText: "Close",
    });
  };

  const onIgnore = async (lessonId) => {
    const ok = await Swal.fire({
      icon: "question",
      title: "Ignore all reports?",
      text: "This will remove report history for this lesson.",
      showCancelButton: true,
      confirmButtonText: "Ignore",
    });
    if (!ok.isConfirmed) return;

    try {
      await ignoreReports(lessonId);
      toast.success("Reports cleared ✅");
      await load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onDeleteLesson = async (lessonMongoId, lessonIdForReports) => {
    const ok = await Swal.fire({
      icon: "warning",
      title: "Delete lesson?",
      text: "This will permanently delete the lesson.",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!ok.isConfirmed) return;

    try {
      await adminDeleteLesson(lessonMongoId);
      // also clear reports for that lessonId string
      await ignoreReports(lessonIdForReports);
      toast.success("Lesson deleted ✅");
      await load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loading) return <LottieLoader />;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-extrabold text-slate-900">Reported Lessons</h2>
      <p className="mt-1 text-sm font-semibold text-slate-600">
        Review reports, delete lesson, or ignore reports.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[1000px] w-full text-left text-sm">
          <thead>
            <tr className="border-b text-xs font-extrabold uppercase text-slate-600">
              <th className="py-3 pr-3">Lesson</th>
              <th className="py-3 pr-3">Visibility</th>
              <th className="py-3 pr-3">Access</th>
              <th className="py-3 pr-3">Reports</th>
              <th className="py-3 pr-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => {
              const lesson = r?.lesson;
              return (
                <tr key={r.lessonId} className="border-b last:border-0">
                  <td className="py-3 pr-3">
                    <p className="font-extrabold text-slate-900">{lesson?.title || "Lesson deleted"}</p>
                    <p className="text-xs font-semibold text-slate-500">
                      {lesson?.creator?.email || lesson?.creator?.uid || ""}
                    </p>
                  </td>

                  <td className="py-3 pr-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
                      {(lesson?.visibility || "unknown").toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 pr-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700">
                      {(lesson?.accessLevel || "unknown").toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 pr-3 font-extrabold text-rose-700">
                    {r.reportCount || 0}
                  </td>

                  <td className="py-3 pr-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => showReasons(r)}
                        className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-extrabold text-white"
                      >
                        View reasons
                      </button>

                      <button
                        onClick={() => onIgnore(r.lessonId)}
                        className="rounded-xl bg-amber-100 px-3 py-2 text-xs font-extrabold text-amber-800"
                      >
                        Ignore
                      </button>

                      {lesson?._id && (
                        <button
                          onClick={() => onDeleteLesson(lesson._id, r.lessonId)}
                          className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-extrabold text-rose-700"
                        >
                          Delete lesson
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan="5" className="py-10 text-center font-semibold text-slate-500">
                  No reported lessons.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={load}
        className="mt-6 rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
      >
        Refresh
      </button>
    </div>
  );
}
