const demoContributors = [
  { name: "Ayesha Rahman", lessons: 12, photo: "https://i.pravatar.cc/150?img=32" },
  { name: "Nafisa Islam", lessons: 9, photo: "https://i.pravatar.cc/150?img=47" },
  { name: "Sadia Khan", lessons: 8, photo: "https://i.pravatar.cc/150?img=12" },
];

const TopContributors = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-white to-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Top Contributors of the Week
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                (Dynamic) Backend থেকে weekly top contributors আসবে।
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {demoContributors.map((u) => (
              <div key={u.name} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="h-12 w-12 rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.lessons} lessons</p>
                  </div>
                </div>

                <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-amber-400"
                    style={{ width: `${Math.min(100, u.lessons * 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
