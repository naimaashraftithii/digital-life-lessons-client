// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import DashboardHome from "./pages/Dashboard/DashboardHome";


import AddLesson from "./pages/Dashboard/AddLesson";
import MyLessons from "./pages/Dashboard/MyLessons";
import MyFavorites from "./pages/Dashboard/MyFavorites";
import Profile from "./pages/Dashboard/Profile";

import AdminHome from "./pages/Dashboard/Admin/AdminHome";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";
import ManageLessons from "./pages/Dashboard/Admin/ManageLessons";
import ReportedLessons from "./pages/Dashboard/Admin/ReportedLessons";
import AdminProfile from "./pages/Dashboard/Admin/AdminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <Profile /> },

      // Admin
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-lessons",
        element: (
          <AdminRoute>
            <ManageLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin/reported-lessons",
        element: (
          <AdminRoute>
            <ReportedLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
