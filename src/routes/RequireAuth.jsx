import { Navigate, useLocation } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LottieLoader />;
  if (!user?.uid) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
}
