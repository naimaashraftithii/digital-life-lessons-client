import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import NotFound from "../pages/Error/NotFound";

import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  // Main website routes (Navbar+Footer থাকবে)
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />, // ✅ any wrong url shows NotFound
    children: [
      { index: true, element: <Home /> },
      { path: "public-lessons", element: <PublicLessons /> },

      // Dashboard (Protected)
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <div>Dashboard Home</div> },
          { path: "add-lesson", element: <div>Add Lesson</div> },
          { path: "my-lessons", element: <div>My Lessons</div> },
        ],
      },
    ],
  },

  // Auth routes (Navbar+Footer থাকবে না)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
