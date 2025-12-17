const PublicLessons = () => {
  return (
    <div className="bg-slate-50">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                Public Life Lessons
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Browse community wisdom. Filter, search, and learn.
              </p>
            </div>
            <img
              className="h-44 w-full rounded-2xl object-cover md:h-52"
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"
              alt="Reading"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">
              এখানে পরে Search + Filter + Sort + Pagination বসবে।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicLessons;
