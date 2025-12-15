import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PublicLessons from "./pages/PublicLessons/PublicLessons";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="public-lessons" element={<PublicLessons />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* later: pricing, dashboard, 404 etc. */}
      </Route>
      {/* 404 route later */}
    </Routes>
  );
}

export default App;
