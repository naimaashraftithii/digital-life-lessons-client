import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import PublicLessons from "./pages/PublicLessons/PublicLessons";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import AddLesson from "./pages/Dashboard/AddLesson";
import MyLessons from "./pages/Dashboard/MyLessons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="public-lessons" element={<PublicLessons />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Dashboard (Protected) */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="add-lesson" element={<AddLesson />} />
          <Route path="my-lessons" element={<MyLessons />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
