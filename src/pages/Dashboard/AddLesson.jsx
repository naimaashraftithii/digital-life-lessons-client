import { useState } from "react";
import { toast } from "react-toastify";

const AddLesson = () => {
  const [accessLevel, setAccessLevel] = useState("free");
  const isPremium = false; // later backend থেকে আসবে

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Lesson added successfully!");
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-extrabold text-slate-900">
        Add New Lesson
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          required
          placeholder="Lesson Title"
          className="w-full rounded-xl border px-4 py-2 text-sm"
        />

        <textarea
          required
          rows={4}
          placeholder="Full description / insight"
          className="w-full rounded-xl border px-4 py-2 text-sm"
        />

        <select className="w-full rounded-xl border px-4 py-2 text-sm">
          <option>Personal Growth</option>
          <option>Career</option>
          <option>Relationships</option>
          <option>Mindset</option>
        </select>

        <select className="w-full rounded-xl border px-4 py-2 text-sm">
          <option>Motivational</option>
          <option>Sad</option>
          <option>Realization</option>
          <option>Gratitude</option>
        </select>

        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          disabled={!isPremium}
          className="w-full rounded-xl border px-4 py-2 text-sm disabled:bg-slate-100"
        >
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>

        {!isPremium && (
          <p className="text-xs text-amber-600">
            Upgrade to Premium to create paid lessons
          </p>
        )}

        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white"
        >
          Save Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
