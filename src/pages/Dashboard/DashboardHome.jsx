import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useDashboardSummary from "../../hooks/useDashboardSummary";
import GradientButton from "../../components/GradientButton";

const HoverCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className={`rounded-3xl bg-white/70 p-5 shadow-sm backdrop-blur border border-white/40 ${className}`}
  >
    {children}
  </motion.div>
);

export default function DashboardHome() {
  const { user } = useAuth();
  const { summary, loading, error } = useDashboardSummary(user?.uid);

  const isPremium = !!summary?.user?.isPremium;
  const counts = summary?.counts || { myLessons: 0, publicLessons: 0, favorites: 0, likes: 0 };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
        <p className="text-sm font-extrabold text-slate-700">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
        <p className="text-sm font-extrabold text-rose-600">{error}</p>
        <p className="mt-2 text-xs font-semibold text-slate-600">
          Check backend + VITE_API_URL + ensure user is saved to MongoDB (upsert).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HoverCard>
          <p className="text-xs font-extrabold text-slate-500">Lessons</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{counts.myLessons}</p>
          <Link className="mt-3 inline-block text-sm font-extrabold text-indigo-600 hover:underline" to="/dashboard/my-lessons">
            View →
          </Link>
        </HoverCard>

        <HoverCard>
          <p className="text-xs font-extrabold text-slate-500">Public Lessons</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{counts.publicLessons}</p>
          <Link className="mt-3 inline-block text-sm font-extrabold text-indigo-600 hover:underline" to="/public-lessons">
            Explore →
          </Link>
        </HoverCard>

        <HoverCard>
          <p className="text-xs font-extrabold text-slate-500">Saved</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{counts.favorites}</p>
          <Link className="mt-3 inline-block text-sm font-extrabold text-indigo-600 hover:underline" to="/dashboard/my-favorites">
            View →
          </Link>
        </HoverCard>

        <HoverCard>
          <p className="text-xs font-extrabold text-slate-500">Likes</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{counts.likes}</p>
          <p className="mt-3 text-sm font-semibold text-slate-600">Across your lessons</p>
        </HoverCard>
      </div>

      <HoverCard className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extrabold text-slate-500">Premium Status</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">{isPremium ? "YES ⭐" : "NO"}</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              {isPremium ? "You can create premium lessons & view premium lessons." : "Upgrade to unlock premium access."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/dashboard/add-lesson">
              <GradientButton className="w-full sm:w-auto">+ Add Lesson</GradientButton>
            </Link>

            {!isPremium && (
              <Link to="/pricing">
                <GradientButton variant="pinkRed" className="w-full sm:w-auto">
                  Upgrade
                </GradientButton>
              </Link>
            )}
          </div>
        </div>
      </HoverCard>
    </div>
  );
}
