import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";
import LottieLoader from "../components/LottieLoader";

export default function PremiumRoute({ children }) {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  const uid = user?.uid;
  const { plan, loading: planLoading } = useUserPlan(uid);

  if (authLoading || planLoading) return <LottieLoader />;

  // Not logged in (extra safety)
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Not premium
  if (!plan?.isPremium) {
    return <Navigate to="/pricing" state={{ from: location.pathname }} replace />;
  }

  return children;
}
