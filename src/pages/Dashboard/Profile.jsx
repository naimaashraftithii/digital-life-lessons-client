import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDashboardSummary from "../../hooks/useDashboardSummary";
import GradientButton from "../../components/GradientButton";
import LottieLoader from "../../components/LottieLoader";

const API = import.meta.env.VITE_API_URL;

const StatCard = ({ label, value, pill }) => (
  <div className="rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg">
    <p className="text-xs font-bold tracking-widest text-slate-500">{label}</p>
    <div className="mt-2 flex items-end justify-between gap-2">
      <p className="text-3xl font-extrabold text-slate-900">{value}</p>
      {pill}
    </div>
  </div>
);

const LessonCard = ({ lesson }) => {
  const created = lesson?.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "";

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-xl bg-slate-900 px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-white">
            {(lesson?.accessLevel || "free").toUpperCase()}
          </span>
          <span className="text-xs font-semibold text-slate-500">{created}</span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-extrabold text-slate-900">
          {lesson?.title || "Untitled"}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-slate-600">
          {lesson?.description || "No description"}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {lesson?.category || "General"}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            {lesson?.tone || lesson?.emotionalTone || "Neutral"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={lesson?.creator?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
              alt="creator"
              className="h-9 w-9 rounded-2xl object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">
                {lesson?.creator?.name || "You"}
              </p>
              <p className="text-xs font-semibold text-slate-500">
                ❤️ {lesson?.likesCount || 0}
              </p>
            </div>
          </div>

          <Link
            to={`/lesson/${lesson?._id}`}
            className="text-sm font-extrabold text-primary hover:underline"
          >
            See details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, updateUserProfile } = useAuth();

  const { data, loading, error } = useDashboardSummary(user?.uid);

  const isPremium = !!data?.user?.isPremium;

  const counts = useMemo(() => ({
    lessonsCreated: data?.counts?.publicLessons ?? 0,
    totalLikes: data?.counts?.likes ?? 0,
    totalSaved: data?.counts?.favorites ?? 0,
  }), [data]);

  // Edit form
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  // Public lessons list
  const [myPublicLessons, setMyPublicLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(true);
  const [lessonsErr, setLessonsErr] = useState("");

  useEffect(() => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user?.displayName, user?.photoURL]);

  // ✅ SINGLE useEffect (no nesting)
  useEffect(() => {
    if (!user?.uid) {
      setMyPublicLessons([]);
      setLessonsLoading(false);
      setLessonsErr("");
      return;
    }

    let ignore = false;

    (async () => {
      try {
        setLessonsLoading(true);
        setLessonsErr("");

        const res = await fetch(`${API}/lessons/my?uid=${user.uid}`);
        const json = await res.json().catch(() => []);

        if (!res.ok) throw new Error(json?.message || "Failed to load your lessons");

        const onlyPublic = (Array.isArray(json) ? json : [])
          .filter((l) => l?.visibility === "public")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (!ignore) setMyPublicLessons(onlyPublic);
      } catch (e) {
        if (!ignore) {
          setMyPublicLessons([]);
          setLessonsErr(e?.message || "Failed to load lessons");
        }
      } finally {
        if (!ignore) setLessonsLoading(false);
      }
    })();

    return () => { ignore = true; };
  }, [user?.uid]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile(name, photo);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) return <LottieLoader />;

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-2xl bg-red-50 p-6 text-sm font-semibold text-red-700">
          {error}
          <p className="mt-2 text-xs font-bold text-red-800">
            If it says “User not found”, logout → login again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* HEADER CARD */}
        <section className="relative overflow-hidden rounded-[32px] bg-white/70 shadow-sm backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-indigo-200/60 via-fuchsia-200/50 to-sky-200/60" />

          <div className="relative grid gap-6 p-6 md:grid-cols-[220px_1fr] md:items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={user?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                alt="Profile"
                className="h-36 w-36 rounded-[28px] object-cover shadow-md md:h-44 md:w-44"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                    {data?.user?.name || user?.displayName || "Anonymous User"}
                  </h1>

                  {isPremium ? (
                    <span className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-extrabold text-amber-800">
                      Premium ⭐
                    </span>
                  ) : (
                    <span className="rounded-lg bg-slate-900 px-2 py-1 text-xs font-extrabold text-white">
                      Free
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {data?.user?.email || user?.email}
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link to="/dashboard/add-lesson">
                    <GradientButton variant="bluePink">+ Add Lesson</GradientButton>
                  </Link>

                  <button
                    onClick={() => setEditing((v) => !v)}
                    className="rounded-xl border border-white/50 bg-white/60 px-5 py-2.5 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-white/80 hover:shadow-md"
                    type="button"
                  >
                    {editing ? "Close Edit" : "Edit Profile"}
                  </button>
                </div>

                {editing && (
                  <form onSubmit={handleSave} className="mt-5 grid gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="grid gap-2 md:grid-cols-2">
                      <label className="text-xs font-extrabold text-slate-600">
                        Display name
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold outline-none focus:border-slate-400"
                          placeholder="Your name"
                        />
                      </label>

                      <label className="text-xs font-extrabold text-slate-600">
                        Photo URL
                        <input
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold outline-none focus:border-slate-400"
                          placeholder="https://..."
                        />
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <GradientButton variant="greenBlue" disabled={saving} className="disabled:opacity-60">
                        {saving ? "Saving..." : "Save changes"}
                      </GradientButton>

                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setName(user?.displayName || "");
                          setPhoto(user?.photoURL || "");
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-slate-500">
                      Email editing is disabled for Firebase security.
                    </p>
                  </form>
                )}
              </div>

              {/* right stats mini */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur transition hover:shadow-lg">
                  <p className="text-xs font-extrabold text-slate-500">Lessons</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">{counts.lessonsCreated}</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur transition hover:shadow-lg">
                  <p className="text-xs font-extrabold text-slate-500">Saved</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">{counts.totalSaved}</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur transition hover:shadow-lg">
                  <p className="text-xs font-extrabold text-slate-500">Likes</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">{counts.totalLikes}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS ROW */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="TOTAL PUBLIC LESSONS"
            value={counts.lessonsCreated}
            pill={<span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700">Newest first</span>}
          />
          <StatCard
            label="TOTAL SAVED (FAVORITES)"
            value={counts.totalSaved}
            pill={
              <Link to="/dashboard/my-favorites" className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white">
                View
              </Link>
            }
          />
          <StatCard
            label="PREMIUM STATUS"
            value={isPremium ? "YES" : "NO"}
            pill={
              isPremium ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">Premium ⭐</span>
              ) : (
                <button
                  onClick={() => navigate("/pricing")}
                  className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white"
                >
                  Upgrade
                </button>
              )
            }
          />
        </section>

        {/* USER PUBLIC LESSONS */}
        <section className="mt-6">
          <div className="rounded-[32px] bg-white/50 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Your public lessons</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Loaded from MongoDB (newest first).
                </p>
              </div>

              <Link to="/dashboard/add-lesson">
                <GradientButton variant="greenBlue">Create another</GradientButton>
              </Link>
            </div>

            {lessonsLoading ? (
              <div className="mt-6"><LottieLoader /></div>
            ) : lessonsErr ? (
              <div className="mt-6 rounded-3xl bg-red-50 p-6 text-sm font-semibold text-red-700">
                {lessonsErr}
              </div>
            ) : myPublicLessons.length === 0 ? (
              <div className="mt-6 rounded-3xl bg-white p-6 text-center shadow-sm">
                <p className="text-lg font-extrabold text-slate-900">No public lessons yet</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Create your first public lesson and share your wisdom.
                </p>
                <div className="mt-5 flex justify-center">
                  <Link to="/dashboard/add-lesson">
                    <GradientButton variant="bluePink">Add Lesson</GradientButton>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {myPublicLessons.map((lesson) => (
                  <LessonCard key={lesson._id} lesson={lesson} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

