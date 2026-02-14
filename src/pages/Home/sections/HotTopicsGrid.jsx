import { Link } from "react-router-dom";

const big = {
  category: "DAILY MEMORY",
  date: "Today",
  title: "A quiet morning can transform your mood",
  desc: "A cup of tea, fresh air, and one intention—small things that reset the mind.",
  img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
};

const small = [
  {
    id: "1",
    category: "TRANSFORMATION",
    date: "This Week",
    title: "7-day reflection habit that changes decisions",
    img: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "2",
    category: "SELF CARE",
    date: "Today",
    title: "Rest without guilt: protect your energy",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "3",
    category: "MINDFUL",
    date: "Weekend",
    title: "3-line gratitude journaling that works",
    img: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "4",
    category: "RELATIONSHIPS",
    date: "This Month",
    title: "Kind boundaries: protect peace & love",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
  },
];

const HotTopicsGrid = () => {
  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-extrabold tracking-widest text-slate-700">
              HOT TOPICS
            </span>
            <span className="text-slate-400">›</span>
          </div>

          <Link
            to="/public-lessons"
            className="text-sm font-extrabold text-primary hover:underline"
          >
            Explore all →
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* BIG left */}
          <Link
            to="/public-lessons"
            className="group relative overflow-hidden rounded-2xl lg:col-span-2"
          >
            <div className="relative h-[300px] sm:h-[420px] lg:h-[520px]">
              <img
                src={big.img}
                alt={big.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            </div>

            {/* hover */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 transition group-hover:ring-white/60" />
            <div className="absolute inset-0 rounded-2xl shadow-lg transition group-hover:shadow-2xl" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-md bg-white px-2 py-1 text-[10px] font-extrabold tracking-widest text-slate-900">
                  {big.category}
                </span>
                <span className="text-xs font-semibold text-white/80">
                  {big.date}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                {big.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
                {big.desc}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-extrabold text-white backdrop-blur transition group-hover:bg-white/20">
                Read lesson <span className="text-base">→</span>
              </div>
            </div>
          </Link>

          {/* RIGHT GRID */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {small.map((it, idx) => (
              <Link
                key={it.id}
                to="/public-lessons"
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  animation: `fadeUp .6s ease both`,
                  animationDelay: `${idx * 120}ms`,
                }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={it.img}
                    alt={it.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-slate-900 px-2 py-1 text-[10px] font-extrabold tracking-widest text-white">
                      {it.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {it.date}
                    </span>
                  </div>

                  <h4 className="mt-3 text-base font-extrabold text-slate-900 line-clamp-2">
                    {it.title}
                  </h4>

                  <div className="mt-3 text-sm font-extrabold text-indigo-600">
                    Read →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* tiny keyframes */}
        <style>
          {`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default HotTopicsGrid;
