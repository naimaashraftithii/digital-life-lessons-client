import { Link } from "react-router-dom";

const demoMostSaved = [
  {
    id: "m1",
    title: "Choose progress over perfection",
    saves: 342,
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "m2",
    title: "Consistency beats motivation",
    saves: 287,
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=80",
  },
];

const MostSavedLessons = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Most Saved Lessons
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                (Dynamic) favoritesCount অনুযায়ী show হবে।
              </p>
            </div>

            <Link to="/public-lessons" className="text-sm font-bold text-primary">
              Explore more →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {demoMostSaved.map((l) => (
              <div
                key={l.id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="relative">
                  <img
                    src={l.image}
                    alt={l.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-xs font-bold text-white/90">
                      🔖 {l.saves} saves
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-extrabold text-slate-900">{l.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Discover why this lesson is saved by many readers.
                  </p>

                  <div className="mt-3">
                    <Link
                      to="/public-lessons"
                      className="text-sm font-bold text-primary hover:underline"
                    >
                      See lesson →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostSavedLessons;
