import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { getStoreData, getToken } from "./lib/utils";
import CustomStore from "./pages/custom_store/CustomStore";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [store, setStore] = useState(null);
  const [token, setToken] = useState(getToken());
  const custom_store = store?.name.toLowerCase().split(" ").join("_");

  useEffect(() => {
    setToken(getToken());
    setStore(getStoreData());
  }, []);

  useEffect(() => {
    if (!token && location.pathname === "/dashboard") {
      navigate("/home");
    }
  }, [token, location.pathname, navigate]);

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
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/home" />}
        />
        <Route path={`/${custom_store}`} element={<CustomStore />} />
      </Routes>
    </>
  );
};

export default Layout;
