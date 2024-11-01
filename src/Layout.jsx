import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Navbar from "./components/navbar/Navbar";
import DashBoardLayout from "./layouts/DashBoardLayout";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {!(
        location.pathname.includes("/dashboard") || location.pathname == "/auth"
      ) && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard/*" element={<DashBoardLayout />} />
      </Routes>
    </>
  );
};

export default Layout;
