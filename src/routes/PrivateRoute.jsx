import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LottieLoader from "../components/LottieLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LottieLoader />;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
