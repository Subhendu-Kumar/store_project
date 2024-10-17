import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import { getStoreData } from "./lib/utils";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import CustomStore from "./pages/custom_store/CustomStore";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const [store, setStore] = useState(null);
  const custom_store = store?.name.toLowerCase().split(" ").join("_");

  useEffect(() => {
    setStore(getStoreData());
  }, []);

  return (
    <>
      {!(
        location.pathname == "/dashboard" ||
        location.pathname == "/auth" ||
        location.pathname == `/${custom_store}`
      ) && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path={`/${custom_store}`} element={<CustomStore />} />
      </Routes>
    </>
  );
};

export default Layout;
