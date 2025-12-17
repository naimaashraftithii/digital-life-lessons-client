import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react";
import loadingAnim from "../assets/Sandy Loading.json"; // তোমার loading json

const LottieLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur">
      <div className="w-40">
        <Lottie animationData={loadingAnim} loop={true} />
      </div>
    </div>
  );
};



export default LottieLoader;
