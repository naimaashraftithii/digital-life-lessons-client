import HeroSlider from "./sections/HeroSlider";
import FeaturedLessonsCarousel from "./sections/FeaturedLessonsCarousel";
import PricingTeaser from "./sections/PricingTeaser";
import FeaturedLessons from "./sections/FeaturedLessons";
import WhyLifeMatters from "./sections/WhyLifeMatters";
import TopContributors from "./sections/TopContributors";
import HotTopicsGrid from "./sections/HotTopicsGrid";
import MostSavedLessons from "./sections/MostSavedLessons";

export default function Home() {
  return (
    <div className="bg-slate-50 w-full">
      <HeroSlider />

      {/* static slider */}
      <FeaturedLessonsCarousel />

      <PricingTeaser />

      {/*  dynamic sections */}
      <FeaturedLessons />
      <WhyLifeMatters />

      <div className="bg-white/30">
        <TopContributors />
        <HotTopicsGrid />
        <MostSavedLessons />
      </div>
    </div>
  );
}
