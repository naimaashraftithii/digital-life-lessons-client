import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import HeroSlider from "./sections/HeroSlider";
import FeaturedLessons from "./sections/FeaturedLessons";
import WhyLifeMatters from "./sections/WhyLifeMatters";
import TopContributors from "./sections/TopContributors";
import MostSavedLessons from "./sections/MostSavedLessons";
const Home = () => {
  return (
    <div className="bg-slate-50 w-full">
      
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
      <HeroSlider />
      <FeaturedLessons />
      <WhyLifeMatters />
      
      
      <div className="bg-white/30">
        <TopContributors />
        <MostSavedLessons />
      </div>
    </div>
  );
};

export default Home;
