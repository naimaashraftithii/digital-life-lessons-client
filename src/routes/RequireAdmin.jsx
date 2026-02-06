import { Navigate } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";

export default function RequireAdmin({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { plan, loading } = useUserPlan(user?.uid);

  if (authLoading || loading) return <LottieLoader />;
  if (!user?.uid) return <Navigate to="/login" replace />;

  const role = plan?.role || "user";
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}
