import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import GradientButton from "../../components/GradientButton";
import Pageerror from "../../assets/Page Not Found 404.json";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md">
        <Lottie animationData={Pageerror} loop={true} />
      </div>

      <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
        Page not found
      </h2>

      <p className="mt-2 text-sm text-slate-600 max-w-md">
        আপনি যে পেজটি খুঁজছেন সেটি এই ওয়েবসাইটে নেই।
      </p>

      <div className="mt-6">
        <Link to="/">
          <GradientButton variant="bluePink">Back to Home</GradientButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
