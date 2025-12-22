import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import Pricing from "../pages/Pricing/Pricing";
import NotFound from "../pages/Error/NotFound";

// Auth pages
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// Dashboard pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AddLesson from "../pages/Dashboard/AddLesson";
import MyLessons from "../pages/Dashboard/MyLessons";
import MyFavorites from "../pages/Dashboard/MyFavorites";
import Profile from "../pages/Dashboard/Profile";

// Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Admin layout + pages
import Admin from "../pages/Dashboard/Admin";
import AdminHome from "../pages/Dashboard/AdminHome";
import AdminProfile from "../pages/Dashboard/AdminProfile";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageLessons from "../pages/Dashboard/ManageLessons";
import ReportedLessons from "../pages/Dashboard/ReportedLessons";

// Payment
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Payment/PaymentCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "public-lessons", element: <PublicLessons /> },

      // pricing is visible only when logged in in your navbar UI logic
      { path: "pricing", element: <Pricing /> },

      // stripe redirects
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancel", element: <PaymentCancel /> },

      {
        path: "lesson/:id",
        element: (
          <PrivateRoute>
            <LessonDetails />
          </PrivateRoute>
        ),
      },

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
          { path: "profile", element: <Profile /> },

          {
            path: "admin",
            element: (
              <AdminRoute>
                <Admin />
              </AdminRoute>
            ),
            children: [
              { index: true, element: <AdminHome /> },
              { path: "profile", element: <AdminProfile /> },
              { path: "manage-users", element: <ManageUsers /> },
              { path: "manage-lessons", element: <ManageLessons /> },
              { path: "reported-lessons", element: <ReportedLessons /> },
            ],
          },
        ],
      },
    ],
  },

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
