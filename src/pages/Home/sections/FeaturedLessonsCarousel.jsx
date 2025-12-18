import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const items = [
  {
    id: "f1",
    title: "Why small habits create big change",
    desc: "One tiny action repeated daily can reshape your mindset and outcomes.",
    tag: "FEATURED",
    date: "Dec 19, 2025",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "f2",
    title: "Boundaries are a form of self-respect",
    desc: "Saying no with kindness protects your peace and your priorities.",
    tag: "FEATURED",
    date: "Dec 19, 2025",
    img: "https://images.unsplash.com/photo-1520975958225-645f74bcd3ff?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "f3",
    title: "Consistency beats motivation",
    desc: "Motivation comes and goes—systems keep you moving forward.",
    tag: "FEATURED",
    date: "Dec 19, 2025",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "f4",
    title: "Mistakes are data, not identity",
    desc: "Learn the lesson, keep the dignity, and move on stronger.",
    tag: "FEATURED",
    date: "Dec 19, 2025",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "f5",
    title: "Gratitude changes your focus",
    desc: "When you track wins, you build confidence and clarity.",
    tag: "FEATURED",
    date: "Dec 19, 2025",
    img: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80",
  },
];

const FeaturedLessonsCarousel = () => {
  const swiperRef = useRef(null);

  return (
    <section className="bg-white/15">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header row like screenshot */}
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 px-4 py-3 backdrop-blur">
            <span className="text-xs font-extrabold tracking-widest text-slate-700">
              FEATURED LESSONS
            </span>
            <span className="text-slate-600">›</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="h-10 w-10 rounded-xl border border-white/50 bg-white/60 text-slate-800 shadow-sm hover:bg-white/80"
              aria-label="Previous"
              type="button"
            >
              ‹
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="h-10 w-10 rounded-xl border border-white/50 bg-white/60 text-slate-800 shadow-sm hover:bg-white/80"
              aria-label="Next"
              type="button"
            >
              ›
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-6">
          <Swiper
            onSwiper={(s) => (swiperRef.current = s)}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {items.map((p) => (
              <SwiperSlide key={p.id}>
                <article className="group h-full overflow-hidden rounded-3xl bg-white/70 shadow-sm backdrop-blur">
                  <div className="relative">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{p.desc}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="rounded-md bg-slate-900 px-2 py-1 text-[10px] font-extrabold tracking-widest text-white">
                        {p.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {p.date}
                      </span>
                    </div>

                    <div className="mt-4">
                      <Link
                        to="/public-lessons"
                        className="text-sm font-extrabold text-primary hover:underline"
                      >
                        Read details →
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessonsCarousel;
