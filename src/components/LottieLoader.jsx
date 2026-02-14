import Lottie from "lottie-react";
import loadingAnim from "../assets/Sandy Loading.json";

const LottieLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/35 backdrop-blur">
      <div className="flex flex-col items-center">
        {/* Lottie */}
        <div className="w-40 sm:w-52">
          <Lottie animationData={loadingAnim} loop />
        </div>

        {/* Text */}
        <h1 className="mt-2 text-center text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-wide animate-bounce">
          Loading<span className="animate-pulse">....!!!</span>
        </h1>

        <p className="mt-1 text-xs sm:text-sm text-slate-600 animate-pulse">
          Please wait a moment....!!!
        </p>
      </div>
    </div>
  );
};

export default LottieLoader;
