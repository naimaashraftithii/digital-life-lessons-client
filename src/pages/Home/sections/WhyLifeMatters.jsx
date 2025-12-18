const benefits = [
  { title: "Remember better", desc: "Store lessons so you don’t forget them over time." },
  { title: "Grow faster", desc: "Reflection helps improve decisions and mindset." },
  { title: "Stay mindful", desc: "A calm space to process experiences with clarity." },
  { title: "Learn from others", desc: "Explore community wisdom and new perspectives." },
];

const WhyLifeMatters = () => {
  return (
    <section className="bg-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Why learning from life matters
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Small reflections build big growth — consistently.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl bg-white/70 p-6 shadow-sm backdrop-blur"
            >
              <h3 className="text-base font-extrabold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLifeMatters;
