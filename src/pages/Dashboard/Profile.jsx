import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import GradientButton from "../../components/GradientButton";
import LottieLoader from "../../components/LottieLoader";

// ✅ TEMP (until backend):
// Replace these with API data later
const MOCK_LESSONS = [
  {
    _id: "l1",
    title: "Consistency beats motivation",
    description:
      "Motivation comes and goes—systems keep you moving forward. My key takeaway: show up even when you don’t feel like it...",
    category: "Mindset",
    tone: "Motivational",
    creatorEmail: "demo@mail.com",
    creatorName: "Demo User",
    creatorPhoto: "https://i.ibb.co/ZxK3f6K/user.png",
    visibility: "public",
    accessLevel: "free",
    createdAt: "2025-12-10T10:20:00Z",
    likesCount: 120,
    favoritesCount: 45,
  },
  {
    _id: "l2",
    title: "Boundaries are self-respect",
    description:
      "Saying no with kindness protects your peace. I learned to say no without guilt, and it changed my mental health...",
    category: "Relationships",
    tone: "Realization",
    creatorEmail: "demo@mail.com",
    creatorName: "Demo User",
    creatorPhoto: "https://i.ibb.co/ZxK3f6K/user.png",
    visibility: "public",
    accessLevel: "premium",
    createdAt: "2025-12-13T13:10:00Z",
    likesCount: 340,
    favoritesCount: 98,
  },
  {
    _id: "l3",
    title: "A mistake is data, not identity",
    description:
      "I used to label myself by failures. Now I treat mistakes like feedback—something to learn from, not something to live under...",
    category: "Personal Growth",
    tone: "Gratitude",
    creatorEmail: "demo@mail.com",
    creatorName: "Demo User",
    creatorPhoto: "https://i.ibb.co/ZxK3f6K/user.png",
    visibility: "public",
    accessLevel: "free",
    createdAt: "2025-12-15T09:00:00Z",
    likesCount: 220,
    favoritesCount: 60,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
  const created = new Date(lesson.createdAt).toLocaleDateString();

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="h-full w-full bg-gradient-to-br from-white/0 via-white/0 to-white/40" />
      </div>

      <div className="relative p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-xl bg-slate-900 px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-white">
            {lesson.accessLevel.toUpperCase()}
          </span>
          <span className="text-xs font-semibold text-slate-500">{created}</span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-extrabold text-slate-900">
          {lesson.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-slate-600">
          {lesson.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {lesson.category}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            {lesson.tone}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={lesson.creatorPhoto}
              alt="creator"
              className="h-9 w-9 rounded-2xl object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">
                {lesson.creatorName}
              </p>
              <p className="text-xs font-semibold text-slate-500">
                ❤️ {lesson.likesCount} • 🔖 {lesson.favoritesCount}
              </p>
            </div>
          </div>

          <Link to={`/lesson/${lesson._id}`} className="text-sm font-extrabold text-primary hover:underline">
            See details →
          </Link>
        </div>
      </div>
    </div>
  );
};

const OfferCard = ({ title, price, points, variant, to }) => (
  <div className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
    <h4 className="text-sm font-extrabold tracking-widest text-slate-600">
      {title}
    </h4>
    <p className="mt-2 text-4xl font-extrabold text-slate-900">{price}</p>

    <ul className="mt-4 space-y-2 text-sm text-slate-700">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-2">
          <span className="mt-2 h-2 w-2 rounded-full bg-slate-900" />
          <span className="font-semibold">{p}</span>
        </li>
      ))}
    </ul>

    <div className="mt-6">
      <Link to={to}>
        <GradientButton variant={variant} className="w-full">
          Upgrade now
        </GradientButton>
      </Link>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, updateUserProfile } = useAuth();

  // ✅ Later: fetch from MongoDB: isPremium + favoritesCount + lessonCount
  const [isPremium] = useState(false);

  // Edit form
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  // ✅ Replace with API call later
  const userPublicLessons = useMemo(() => {
    const email = user?.email;
    if (!email) return [];
    return MOCK_LESSONS
      .filter((l) => l.creatorEmail === email && l.visibility === "public")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [user?.email]);

  const stats = useMemo(() => {
    const lessonsCreated = userPublicLessons.length; // only public in mock
    const totalLikes = userPublicLessons.reduce((sum, l) => sum + (l.likesCount || 0), 0);
    const totalSaved = userPublicLessons.reduce((sum, l) => sum + (l.favoritesCount || 0), 0);
    return { lessonsCreated, totalLikes, totalSaved };
  }, [userPublicLessons]);

  useEffect(() => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user?.displayName, user?.photoURL]);

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

  if (loading) return <LottieLoader />;

  return (
    <div className="min-h-[calc(100vh-80px)] w-full px-4 py-6">
      {/* Page background wrapper (soft gradient layer) */}
      <div className="mx-auto max-w-6xl">
        {/* HEADER CARD (like your screenshot) */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-[32px] bg-white/70 shadow-sm backdrop-blur"
        >
          {/* top glow */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-indigo-200/60 via-fuchsia-200/50 to-sky-200/60" />

          <div className="relative grid gap-6 p-6 md:grid-cols-[220px_1fr] md:items-center">
            {/* avatar */}
            <div className="flex justify-center md:justify-start">
              <img
                src={user?.photoURL || "https://i.ibb.co/ZxK3f6K/user.png"}
                alt="Profile"
                className="h-36 w-36 rounded-[28px] object-cover shadow-md md:h-44 md:w-44"
              />
            </div>

            {/* info + stats */}
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                    {user?.displayName || "Anonymous User"}
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
                  {user?.email}
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link to="/dashboard/add-lesson">
                    <GradientButton variant="bluePink">
                      + Add Lesson
                    </GradientButton>
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
                  <form
                    onSubmit={handleSave}
                    className="mt-5 grid gap-3 rounded-2xl bg-white p-4 shadow-sm"
                  >
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
                      <GradientButton
                        variant="greenBlue"
                        disabled={saving}
                        className="disabled:opacity-60"
                      >
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
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">
                    {stats.lessonsCreated}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur transition hover:shadow-lg">
                  <p className="text-xs font-extrabold text-slate-500">Saved</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">
                    {stats.totalSaved}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm backdrop-blur transition hover:shadow-lg">
                  <p className="text-xs font-extrabold text-slate-500">Likes</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">
                    {stats.totalLikes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* STATS ROW */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <StatCard
            label="TOTAL PUBLIC LESSONS"
            value={stats.lessonsCreated}
            pill={
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700">
                Newest first
              </span>
            }
          />
          <StatCard
            label="TOTAL SAVED (FAVORITES)"
            value={stats.totalSaved}
            pill={
              <Link
                to="/dashboard/my-favorites"
                className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-white"
              >
                View
              </Link>
            }
          />
          <StatCard
            label="PREMIUM STATUS"
            value={isPremium ? "YES" : "NO"}
            pill={
              isPremium ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
                  Premium ⭐
                </span>
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
        </motion.section>

        {/* FREE USER OFFERS */}
        {!isPremium && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 rounded-[32px] bg-white/50 p-6 shadow-sm backdrop-blur"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Upgrade offers for you
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Lifetime access unlocks Premium lessons & creation.
                </p>
              </div>
              <Link to="/pricing" className="text-sm font-extrabold text-primary hover:underline">
                See full comparison →
              </Link>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <OfferCard
                title="LIFETIME PREMIUM"
                price="৳1500"
                variant="pinkRed"
                to="/pricing"
                points={[
                  "One-time payment, lifetime access",
                  "View Premium public lessons",
                  "Create Premium lessons",
                  "Premium lock / blur support",
                ]}
              />
              <OfferCard
                title="PREMIUM BENEFITS"
                price="⭐"
                variant="bluePink"
                to="/pricing"
                points={[
                  "Ad-free experience (later)",
                  "Priority listing (later)",
                  "Advanced filters (later)",
                  "Support & feature requests",
                ]}
              />
            </div>
          </motion.section>
        )}

        {/* USER PUBLIC LESSONS */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6"
        >
          <div className="rounded-[32px] bg-white/50 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Your public lessons
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Same card style as public lessons page (newest first).
                </p>
              </div>

              <Link to="/dashboard/add-lesson">
                <GradientButton variant="greenBlue">Create another</GradientButton>
              </Link>
            </div>

            {userPublicLessons.length === 0 ? (
              <div className="mt-6 rounded-3xl bg-white p-6 text-center shadow-sm">
                <p className="text-lg font-extrabold text-slate-900">
                  No public lessons yet
                </p>
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
                {userPublicLessons.map((lesson) => (
                  <LessonCard key={lesson._id} lesson={lesson} />
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Profile;
