// src/pages/Home/sections/WhyLifeMatters.jsx
import { useMemo, useState } from "react";

export default function WhyLifeMatters() {
  const [openVideo, setOpenVideo] = useState(false);

  const items = useMemo(
    () => [
      {
        title: "Capture your moments",
        desc: "Turn your everyday experiences into lessons you can revisit anytime.",
        icon: "📝",
      },
      {
        title: "Reflect & grow",
        desc: "Track your mindset, learn patterns, and level up your personal journey.",
        icon: "🌱",
      },
      {
        title: "Share wisdom",
        desc: "Help others with your story—your lesson might be someone’s turning point.",
        icon: "🤝",
      },
      {
        title: "Learn from others",
        desc: "Explore public lessons and get inspired by the community.",
        icon: "✨",
      },
    ],
    []
  );

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        {/* Wrapper */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          {/* Decorative gradient blur */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-200/50 blur-3xl" />

          {/* Top content */}
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left text */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Why Life Lessons Matter
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-600 sm:text-base">
                Capture, reflect, and grow. Share your wisdom and learn from others.
              </p>

              {/* CTAs */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setOpenVideo(true)}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  type="button"
                >
                  <span className="text-lg transition group-hover:scale-110">▶</span>
                  Watch how it works
                </button>

                <a
                  href="/public-lessons"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg active:translate-y-0"
                >
                  Explore public lessons
                </a>
              </div>

              {/* Mini stats (optional, looks dynamic) */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <StatChip label="Create" value="Fast" />
                <StatChip label="Share" value="Public/Private" />
                <StatChip label="Grow" value="Daily" />
              </div>
            </div>

            {/* Right media */}
            <div className="relative">
              <div className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
                {/* Replace this image with your own asset */}
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70"
                  alt="People learning together"
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-80"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent opacity-90" />

                {/* Floating play button */}
                <button
                  onClick={() => setOpenVideo(true)}
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                  type="button"
                >
                  <span className="text-lg">🎬</span> Open video
                </button>

                {/* Hover glow border */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/40 transition group-hover:ring-2 group-hover:ring-indigo-300/60" />
              </div>

              <p className="mt-3 text-xs font-semibold text-slate-500">
                Tip: replace the image/video with your own brand assets anytime.
              </p>
            </div>
          </div>

          {/* Interactive cards */}
          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
              <div
                key={it.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Card glow */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl opacity-0 transition group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <div className="text-2xl transition group-hover:scale-110">{it.icon}</div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-extrabold text-white transition group-hover:bg-indigo-600">
                    NEW
                  </span>
                </div>

                <h3 className="mt-4 text-base font-extrabold text-slate-900">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  {it.desc}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-indigo-700">
                  Learn more
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {openVideo && (
          <div
            className="fixed inset-0 z-[999] grid place-items-center bg-slate-900/70 p-4 backdrop-blur"
            onClick={() => setOpenVideo(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-slate-950 px-4 py-3">
                <p className="text-sm font-extrabold text-white">How it works</p>
                <button
                  className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-extrabold text-white transition hover:bg-white/20"
                  onClick={() => setOpenVideo(false)}
                  type="button"
                >
                  Close ✕
                </button>
              </div>

              {/* Put your own YouTube/Vimeo embed here */}
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="How it works"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatChip({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 text-center transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
      <p className="text-[11px] font-extrabold tracking-widest text-slate-500">
        {label.toUpperCase()}
      </p>
      <p className="mt-1 text-xs font-extrabold text-slate-900">{value}</p>
    </div>
  );
}
