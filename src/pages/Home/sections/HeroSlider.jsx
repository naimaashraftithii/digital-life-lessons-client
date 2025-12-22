import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import GradientButton from "../../../components/GradientButton";

const slides = [
  {
    badge: "Digital Life Lessons",
    title: "Capture your wisdom before it fades.",
    desc: "Write meaningful lessons, organize them by category and emotional tone, and revisit them anytime.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    cta1: { text: "Explore Public Lessons", to: "/public-lessons", variant: "bluePink" },
    cta2: { text: "Go to Dashboard", to: "/dashboard", variant: "greenBlue" },
  },
  {
    badge: "Mindful Reflection",
    title: "Turn experiences into personal growth.",
    desc: "Save private reflections or share public wisdom to inspire others in the community.",
    image:
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1600&q=80",
    cta1: { text: "Add a Lesson", to: "/dashboard/add-lesson", variant: "greenBlue" },
    cta2: { text: "See Public Lessons", to: "/public-lessons", variant: "bluePink" },
  },
  {
    badge: "Community Wisdom",
    title: "Learn from stories, not just quotes.",
    desc: "Browse lessons by category, emotional tone, and keywords—discover insights that match your journey.",
    //  video background 
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    cta1: { text: "UpgradePricing", to: "/pricing", variant: "pinkRed" },
    cta2: { text: "My Lessons", to: "/dashboard/my-lessons", variant: "bluePink" },
  },
];

const HeroSlider = () => {
  return (
    <section className="bg-white/20">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/40 shadow-sm backdrop-blur">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
          >
            {slides.map((s, idx) => (
              <SwiperSlide key={idx}>
                <div className="grid gap-8 p-5 md:grid-cols-2 md:items-center md:p-10">
                  {/* LEFT */}
                  <div>

                    <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-indigo-700">
                      {s.badge}
                    </span>

                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                      {s.title}
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                      {s.desc}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link to={s.cta1.to}>
                        <GradientButton variant={s.cta1.variant}>
                          {s.cta1.text}
                        </GradientButton>
                      </Link>

                      <Link to={s.cta2.to}>
                        <GradientButton variant={s.cta2.variant}>
                          {s.cta2.text}
                        </GradientButton>
                      </Link>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/10" />

                    {s.video ? (
                      <video
                        className="h-72 w-full object-cover sm:h-80 md:h-[380px]"
                        src={s.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        className="h-72 w-full object-cover sm:h-80 md:h-[380px]"
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                      />
                    )}

                    <div className="relative p-4">
                      <p className="text-sm font-bold text-slate-900">
                        Save lessons with meaning
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Public or Private — Free or Premium access level.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
