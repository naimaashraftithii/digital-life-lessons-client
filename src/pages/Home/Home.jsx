import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import HeroSlider from "./sections/HeroSlider";
import FeaturedLessons from "./sections/FeaturedLessons";
import WhyLifeMatters from "./sections/WhyLifeMatters";
import TopContributors from "./sections/TopContributors";
import MostSavedLessons from "./sections/MostSavedLessons";
import FeaturedLessonsCarousel from "./sections/FeaturedLessonsCarousel";
import PricingTeaser from "./sections/PricingTeaser";
import HotTopicsGrid from "./sections/HotTopicsGrid";
const Home = () => {
  return (
    <div className="bg-slate-50 w-full">
      
      <HeroSlider />
      {/* Featured slider */}
      <FeaturedLessonsCarousel />

      {/* Pricing teaser cards */}
      <PricingTeaser />
      <FeaturedLessons />
      <WhyLifeMatters />
      
      
      <div className="bg-white/30">
        <TopContributors />
        <HotTopicsGrid />
        <MostSavedLessons />
      </div>
      
    </div>
  );
};

export default Home;
