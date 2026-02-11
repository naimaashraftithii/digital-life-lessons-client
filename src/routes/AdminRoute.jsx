import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";
import LottieLoader from "../components/LottieLoader";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  if (authLoading || planLoading) return <LottieLoader />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (plan?.role !== "admin") {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
}
