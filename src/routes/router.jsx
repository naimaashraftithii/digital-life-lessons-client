import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import NotFound from "../pages/Error/NotFound";

// Auth pages
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// Dashboard pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AddLesson from "../pages/Dashboard/AddLesson";
import MyLessons from "../pages/Dashboard/MyLessons";
import MyFavorites from "../pages/Dashboard/MyFavorites";

// Route guards
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  /* ================= MAIN WEBSITE ================= */
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "public-lessons", element: <PublicLessons /> },

      /* -------- Lesson Details (Protected) -------- */
      {
        path: "lesson/:id",
        element: (
          <PrivateRoute>
            <LessonDetails />
          </PrivateRoute>
        ),
      },

      /* ================= DASHBOARD ================= */
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "add-lesson", element: <AddLesson /> },
          { path: "my-lessons", element: <MyLessons /> },
          { path: "my-favorites", element: <MyFavorites /> },
        ],
      },
    ],
  },

  /* ================= AUTH PAGES ================= */
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
