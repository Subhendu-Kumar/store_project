import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {!(location.pathname == "/dashboard" || location.pathname == "/auth") && (
        <Navbar />
      )}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default Layout;
