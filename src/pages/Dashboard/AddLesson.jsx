import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import { createLesson } from "../../api/lessons";
import { Link, useNavigate } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";

export default function AddLesson() {
  const { user } = useAuth();
  const { plan, loading } = useUserPlan(user?.uid);
  const isPremium = !!plan?.isPremium;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal Growth");
  const [tone, setTone] = useState("Motivational");
  const [visibility, setVisibility] = useState("public");
  const [accessLevel, setAccessLevel] = useState("free");
  const [photoUrl, setPhotoUrl] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return <LottieLoader />;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) {
      toast.error("Please login first");
      return;
    }

    // Free user cannot post premium lessons, but can post FREE
    if (accessLevel === "premium" && !isPremium) {
      toast.error("Upgrade to Premium to create premium lessons");
      return;
    }

    const lesson = {
      title,
      description,
      category,
      tone,
      visibility,
      accessLevel: isPremium ? accessLevel : "free", // force free for free users
      photoUrl: photoUrl || "",
      creator: {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      },
    };

    try {
      setSaving(true);
      await createLesson(lesson);
      toast.success("Lesson added successfully ✅");

      setTitle("");
      setDescription("");
      setCategory("Personal Growth");
      setTone("Motivational");
      setVisibility("public");
      setAccessLevel("free");
      setPhotoUrl("");

      navigate("/dashboard/my-lessons");
    } catch (err) {
      toast.error(err?.message || "Failed to create lesson");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold text-slate-900">Add New Lesson</h1>

        {!isPremium && (
          <Link
            to="/pricing"
            className="rounded-xl bg-amber-100 px-4 py-2 text-sm font-extrabold text-amber-800"
            title="Upgrade to create premium lessons"
          >
            Upgrade to Premium ⭐
          </Link>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Lesson Title"
          className="w-full rounded-xl border px-4 py-2 text-sm font-semibold"
        />

        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          placeholder="Full Description / Story / Insight"
          className="w-full rounded-xl border px-4 py-2 text-sm font-semibold"
        />

        <input
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Image URL (optional) e.g. https://..."
          className="w-full rounded-xl border px-4 py-2 text-sm font-semibold"
        />

        {photoUrl && (
          <div className="overflow-hidden rounded-2xl border bg-slate-50">
            <img
              src={photoUrl}
              alt="Preview"
              className="h-44 w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                toast.error("Invalid image URL");
              }}
            />
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-extrabold text-slate-600">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 text-sm font-semibold"
            >
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Relationships</option>
              <option>Mindset</option>
              <option>Mistakes Learned</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-600">Emotional Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 text-sm font-semibold"
            >
              <option>Motivational</option>
              <option>Sad</option>
              <option>Realization</option>
              <option>Gratitude</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-extrabold text-slate-600">Privacy</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 text-sm font-semibold"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-600">Access Level</label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              disabled={!isPremium}
              title={!isPremium ? "Upgrade to Premium to create paid lessons" : ""}
              className="mt-1 w-full rounded-xl border px-4 py-2 text-sm font-semibold disabled:bg-slate-100"
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        {!isPremium && (
          <p className="text-xs font-semibold text-amber-700">
            “Premium” is disabled for Free users. Upgrade to Premium to create paid lessons.
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-slate-900 px-6 py-2 text-sm font-extrabold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Lesson"}
        </button>
      </form>
    </div>
  );
}
