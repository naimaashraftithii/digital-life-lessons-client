import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

import LottieLoader from "../../components/LottieLoader";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import {
  getLessonById,
  getFavoritesCount,
  getSimilarLessons,
  toggleLike,
} from "../../api/lessons";

import { toggleFavorite } from "../../api/favorites";
import { addComment, deleteComment, getComments } from "../../api/comments";
import { reportLesson } from "../../api/reports";

export default function LessonDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favCount, setFavCount] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [similar, setSimilar] = useState([]);

  const shareUrl = useMemo(() => window.location.href, []);
  const views = useMemo(() => Math.floor(Math.random() * 10000), []);

  const locked = lesson?.accessLevel === "premium" && !plan?.isPremium;

  const reloadComments = async () => {
    try {
      const cm = await getComments(id);
      setComments(Array.isArray(cm) ? cm : []);
    } catch (e) {
      toast.error(e?.message || "Failed to load comments");
    }
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const data = await getLessonById(id);
      setLesson(data);

      const [fc, cm, sim] = await Promise.all([
        getFavoritesCount(id),
        getComments(id),
        getSimilarLessons(id),
      ]);

      setFavCount(fc?.favoritesCount || 0);
      setComments(Array.isArray(cm) ? cm : []);
      setSimilar(Array.isArray(sim) ? sim : []);
    } catch (e) {
      toast.error(e?.message || "Failed to load lesson");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line 
  }, [id]);

  if (loading || planLoading) return <LottieLoader />;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl bg-white p-6 shadow-sm text-center">
          <h2 className="text-xl font-extrabold text-slate-900">Lesson not found</h2>
          <Link
            to="/public-lessons"
            className="mt-4 inline-block font-bold text-slate-900 underline"
          >
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  if (locked) return <Navigate to="/pricing" replace state={{ from: `/lesson/${id}` }} />;

  const onLike = async () => {
    if (!user?.uid) return toast.error("Please log in to like");

    try {
      const res = await toggleLike(id, user.uid);
      setLesson((prev) => ({ ...prev, likesCount: res?.likesCount ?? prev?.likesCount ?? 0 }));
      toast.success("Liked updated ✅");
    } catch (e) {
      toast.error(e?.message || "Failed to like");
    }
  };

  const onFavorite = async () => {
    if (!user?.uid) return toast.error("Please log in to save");

    try {
      const res = await toggleFavorite(user.uid, id);
      setFavCount((c) => (res?.saved ? c + 1 : Math.max(0, c - 1)));
      toast.success(res?.saved ? "Saved to favorites 🔖" : "Suggestion removed ✅");
    } catch (e) {
      toast.error(e?.message || "Failed to save");
    }
  };

  const onReport = async () => {
    if (!user?.uid && !user?.email) return toast.error("Please log in to report");

    const { value: reason } = await Swal.fire({
      title: "Report Lesson",
      input: "select",
      inputOptions: {
        "Inappropriate Content": "Inappropriate Content",
        "Hate Speech or Harassment": "Hate Speech or Harassment",
        "Misleading or False Information": "Misleading or False Information",
        "Spam or Promotional Content": "Spam or Promotional Content",
        "Sensitive or Disturbing Content": "Sensitive or Disturbing Content",
        Other: "Other",
      },
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
      confirmButtonText: "Next",
    });

    if (!reason) return;

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Confirm report?",
      text: "Are you sure you want to report this lesson?",
      showCancelButton: true,
      confirmButtonText: "Yes, report",
    });

    if (!confirm.isConfirmed) return;

    try {
      await reportLesson({
        lessonId: id,
        reporterUid: user?.uid || null,
        reporterEmail: user?.email || null,
        reason,
      });
      toast.success("Reported ✅");
    } catch (e) {
      toast.error(e?.message || "Failed to report");
    }
  };

  const onPostComment = async () => {
    if (!user?.uid) return toast.error("Please log in to comment");
    if (!commentText.trim()) return toast.error("Write something first");

    try {
      await addComment({
        lessonId: id,
        uid: user.uid,
        name: user.displayName || "User",
        photoURL: user.photoURL || "",
        text: commentText.trim(),
      });

      setCommentText("");
      await reloadComments();
      toast.success("Comment posted ✅");
    } catch (e) {
      toast.error(e?.message || "Failed to comment");
    }
  };

  const onDeleteComment = async (commentId) => {
    if (!user?.uid) return toast.error("Please log in");

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete comment?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteComment(commentId, user.uid);
      setComments((prev) => prev.filter((c) => String(c._id) !== String(commentId)));
      toast.success("Comment deleted ✅");
    } catch (e) {
      toast.error(e?.message || "Failed to delete");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Lesson card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">{lesson.title}</h1>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-indigo-100 px-3 py-1 font-extrabold text-indigo-700">
                  {lesson.category}
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 font-extrabold text-amber-700">
                  {lesson.tone}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-extrabold text-slate-700">
                  {(lesson.accessLevel || "free").toUpperCase()}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-extrabold text-emerald-700">
                  {lesson.visibility?.toUpperCase() || "PUBLIC"}
                </span>
              </div>
            </div>

            {/* Author card */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={lesson?.creator?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                  alt="creator"
                  className="h-11 w-11 rounded-2xl object-cover"
                />
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    {lesson?.creator?.name || "Unknown"}
                  </p>
                  <p className="text-xs font-semibold text-slate-600">
                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleString() : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          {lesson.photoUrl && (
            <div className="mt-5 overflow-hidden rounded-3xl border bg-slate-50">
              <img
                src={lesson.photoUrl}
                alt="lesson"
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          )}

          {/* Content */}
          <p className="mt-5 whitespace-pre-line text-slate-700 leading-relaxed">
            {lesson.description}
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-2xl bg-white ring-1 ring-slate-200 px-4 py-2 text-sm font-extrabold text-slate-900">
              ❤️ {lesson.likesCount || 0} Likes
            </span>
            <span className="rounded-2xl bg-white ring-1 ring-slate-200 px-4 py-2 text-sm font-extrabold text-slate-900">
              
               {favCount} Favorites
            </span>
            <span className="rounded-2xl bg-white ring-1 ring-slate-200 px-4 py-2 text-sm font-extrabold text-slate-900">
              💬
            {comments.length} Comments
            </span>
            <span className="rounded-2xl bg-white ring-1 ring-slate-200 px-4 py-2 text-sm font-extrabold text-slate-900">
           👁‍🗨
           {views} Views
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={onFavorite}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
              type="button"
            >
              🔖 Save
            </button>
            <button
              onClick={onLike}
              className="rounded-2xl bg-rose-100 px-4 py-2 text-sm font-extrabold text-rose-700"
              type="button"
            >
              ❤️ Like
            </button>
            <button
              onClick={onReport}
              className="rounded-2xl bg-amber-100 px-4 py-2 text-sm font-extrabold text-amber-800"
              type="button"
            >
              🚩 Report
            </button>

            {/* Share */}
            <div className="ml-auto flex items-center gap-2">
              <FacebookShareButton url={shareUrl} quote={lesson.title}>
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl} title={lesson.title}>
                <WhatsappIcon size={36} round />
              </WhatsappShareButton>
              <LinkedinShareButton url={shareUrl} title={lesson.title}>
                <LinkedinIcon size={36} round />
              </LinkedinShareButton>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/public-lessons" className="text-sm font-extrabold text-slate-900 underline">
              ← Back to lessons
            </Link>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Comments</h2>

          <div className="mt-4 flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-2xl border px-4 py-2 text-sm font-semibold"
            />
            <button
              onClick={onPostComment}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white"
              type="button"
            >
              Post
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {comments.map((c) => (
              <div key={c._id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                      alt="user"
                      className="h-9 w-9 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{c.name || "User"}</p>
                      <p className="text-xs font-semibold text-slate-600">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                      </p>
                    </div>
                  </div>

                  {user?.uid && c.uid === user.uid && (
                    <button
                      onClick={() => onDeleteComment(c._id)}
                      className="rounded-xl bg-rose-100 px-3 py-1.5 text-xs font-extrabold text-rose-700"
                      type="button"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <p className="mt-2 text-sm font-semibold text-slate-700">{c.text}</p>
              </div>
            ))}

            {!comments.length && (
              <p className="text-sm font-semibold text-slate-600 mt-2">
                No comments yet. Be the first!
              </p>
            )}
          </div>
        </div>

        {/* Similar */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Similar & Recommended</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((l) => (
              <Link
                key={l._id}
                to={`/lesson/${l._id}`}
                className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm font-extrabold text-slate-900 line-clamp-2">{l.title}</p>
                <p className="mt-1 text-xs font-semibold text-slate-600 line-clamp-2">
                  {l.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-indigo-100 px-2 py-1 font-extrabold text-indigo-700">
                    {l.category}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-1 font-extrabold text-amber-700">
                    {l.tone}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {!similar.length && (
            <p className="mt-3 text-sm font-semibold text-slate-600">No similar lessons found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
