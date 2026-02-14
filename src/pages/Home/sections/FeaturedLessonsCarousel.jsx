import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const items = [
  {
    id: "1",
    title: "A calm morning can reset your day",
    desc: "Small rituals build focus and emotional balance over time.",
    tag: "MINDFUL",
    date: "Dec 20, 2025",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    title: "Consistency beats motivation",
    desc: "A tiny step daily builds momentum and self-trust.",
    tag: "GROWTH",
    date: "Dec 19, 2025",
    img: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Boundaries protect your peace",
    desc: "Saying no kindly is a powerful act of self-respect.",
    tag: "RELATION",
    date: "Dec 18, 2025",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    title: "Mistakes are data, not identity",
    desc: "Take the lesson, leave the shame, move forward stronger.",
    tag: "MINDSET",
    date: "Dec 17, 2025",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "5",
    title: "Gratitude shifts your focus",
    desc: "Track small wins to build confidence and clarity.",
    tag: "GRATITUDE",
    date: "Dec 16, 2025",
    img: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "6",
    title: "Learn to rest without guilt",
    desc: "Rest is not lazy—it's recovery and renewal.",
    tag: "SELFCARE",
    date: "Dec 15, 2025",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "7",
    title: "Your environment shapes habits",
    desc: "Make good choices easier by designing your space.",
    tag: "SYSTEMS",
    date: "Dec 14, 2025",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "8",
    title: "Reflection makes you wiser",
    desc: "Write lessons to remember what truly matters.",
    tag: "REFLECT",
    date: "Dec 13, 2025",
    img: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=80",
  },
];

const FeaturedLessonsCarousel = () => {
  const swiperRef = useRef(null);

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-extrabold tracking-widest text-slate-700">
              FEATURED LESSONS
            </span>
            <span className="text-slate-400">›</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="h-10 w-10 rounded-lg border border-slate-200 bg-white text-lg font-bold hover:bg-slate-100 active:scale-95 transition"
              aria-label="Prev"
            >
              ‹
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="h-10 w-10 rounded-lg border border-slate-200 bg-white text-lg font-bold hover:bg-slate-100 active:scale-95 transition"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          loop={true}
          speed={300} 
          autoplay={{
            delay: 2, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          freeMode={true}
          allowTouchMove={true}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 4.1 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-slate-200">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold leading-snug text-slate-900 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {item.desc}
                  </p>

                  <div className="mt-auto pt-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-md bg-slate-900 px-2 py-1 text-[10px] font-extrabold tracking-widest text-white">
                        {item.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {item.date}
                      </span>
                    </div>

                    <Link
                      to="/public-lessons"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 hover:underline"
                    >
                      Read more ➡
                       <span className="text-base">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedLessonsCarousel;
