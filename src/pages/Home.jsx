const Home = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Digital Life Lessons
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Capture your wisdom before it fades.
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            Turn everyday experiences into lifelong lessons. Write, organize,
            and revisit your insights — and discover wisdom shared by others.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            🔄 এখানে পরে Hero Slider / Featured Lessons section আসবে।
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
