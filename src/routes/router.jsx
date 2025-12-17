import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import Home from "../pages/Home/Home";
import PublicLessons from "../pages/PublicLessons/PublicLessons";

import PrivateRoute from "./PrivateRoute";

// NOTE: Login/Register তুমি এখনও add করোনি, তাই placeholder route রাখলাম
// পরে src/pages/Auth/Login/Login.jsx & Register.jsx তৈরি হলে import করে বসাবে

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div className="p-10">404 | Not Found</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "public-lessons", element: <PublicLessons /> },

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

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ],
  },
]);

export default router;
