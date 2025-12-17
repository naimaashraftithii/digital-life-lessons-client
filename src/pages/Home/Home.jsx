import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-50">
      {/* HERO (bg + image) */}
      <section className="bg-gradient-to-b from-indigo-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                Digital Life Lessons
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Capture your wisdom before it fades.
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Write meaningful lessons, organize them by category & emotional tone,
                and grow by exploring wisdom from the community.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/public-lessons"
                  className="rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Explore Public Lessons
                </Link>

                <Link
                  to="/dashboard"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>

            {/* image card */}
            <div className="rounded-3xl bg-white p-3 shadow-sm">
              <img
                className="h-[260px] w-full rounded-2xl object-cover sm:h-[320px] md:h-[380px]"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="People learning together"
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Turn moments into lessons
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Save private reflections or share public wisdom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED (dynamic later) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Featured Life Lessons
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Admin dashboard থেকে control হবে (later).
              </p>
            </div>
            <Link to="/public-lessons" className="text-sm font-semibold text-primary">
              View all →
            </Link>
          </div>

          {/* cards placeholder */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-semibold text-slate-500">Motivational • Mindset</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  A small habit can change everything
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Short preview of lesson content will appear here…
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS (benefit cards) */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why learning from life matters
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Simple reflection builds clarity, resilience, and growth.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Remember better", desc: "Store lessons so you don’t forget." },
              { title: "Grow faster", desc: "See patterns and improve decisions." },
              { title: "Stay mindful", desc: "Reflect with intention and calm." },
              { title: "Learn from others", desc: "Explore community wisdom." },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{b.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA SECTIONS (dynamic later) */}
      <section className="bg-gradient-to-b from-amber-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Top contributors of the week
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Dynamic list will come from backend later.
              </p>
              <img
                className="mt-4 h-40 w-full rounded-2xl object-cover"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="Top contributors"
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Most saved lessons</h3>
              <p className="mt-2 text-sm text-slate-600">
                Sorted by favoritesCount later.
              </p>
              <img
                className="mt-4 h-40 w-full rounded-2xl object-cover"
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80"
                alt="Most saved lessons"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
