import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LottieLoader from "../components/LottieLoader";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LottieLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
}
