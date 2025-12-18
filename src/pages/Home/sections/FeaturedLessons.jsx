import { Link } from "react-router-dom";

const demoFeatured = [
  {
    id: "1",
    title: "Small habits build unstoppable momentum",
    category: "Mindset",
    tone: "Motivational",
    desc: "A tiny daily action can transform your future faster than you expect.",
  },
  {
    id: "2",
    title: "Boundaries protect your peace",
    category: "Relationships",
    tone: "Realization",
    desc: "Saying no with respect is a form of self-care and self-respect.",
  },
  {
    id: "3",
    title: "Mistakes are data, not identity",
    category: "Personal Growth",
    tone: "Gratitude",
    desc: "Learn the lesson and move forward without carrying shame.",
  },
];

const FeaturedLessons = () => {
  return (
    <section className="bg-white/20">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Featured Life Lessons
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              (Dynamic) Admin dashboard থেকে featured control হবে।
            </p>
          </div>

          <Link to="/public-lessons" className="text-sm font-bold text-primary">
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demoFeatured.map((l) => (
            <div
              key={l.id}
              className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur"
            >
              <p className="text-xs font-bold text-slate-500">
                {l.tone} • {l.category}
              </p>
              <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                {l.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{l.desc}</p>

              <div className="mt-4">
                <Link
                  to="/public-lessons"
                  className="text-sm font-bold text-primary hover:underline"
                >
                  See details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
