// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserPlan from "../hooks/useUserPlan";
import LottieLoader from "../components/LottieLoader";

export default function AdminRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.uid);

  if (authLoading || planLoading) return <LottieLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (plan?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}
