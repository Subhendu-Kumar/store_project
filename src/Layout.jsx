import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Error404 from "./components/404page/Error404";
import DashBoardLayout from "./layouts/DashBoardLayout";
import { Route, Routes, Navigate } from "react-router-dom";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard/*" element={<DashBoardLayout />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Layout;
