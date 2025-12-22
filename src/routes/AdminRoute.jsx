// src/routes/AdminRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";
import LottieLoader from "../components/LottieLoader";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  if (loading || planLoading) return <LottieLoader />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (plan?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
