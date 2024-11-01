import ProductsLayout from "./ProductsLayout";
import SettingsLayout from "./SettingsLayout";
import OrdersHome from "@/sections/orders/OrdersHome";
import DeliveryHome from "@/sections/delivery/DeliveryHome";
import CustomerHome from "@/sections/customers/CustomerHome";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import DashBoardHome from "@/sections/dashboardHome/DashBoardHome";
import OffersDiscounts from "@/sections/offers&discounts/OffersDiscounts";

import { useEffect, useState } from "react";
import { getStoreData, getToken } from "@/lib/utils";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const DashBoardLayout = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    setToken(getToken());
    setStore(getStoreData());
  }, []);

  useEffect(() => {
    if (!token && location.pathname.includes("/dashboard")) {
      navigate("/auth", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <SidebarDesktop store={store} />
      <div className="w-full h-full bg-white">
        <Routes>
          <Route path="" element={<Navigate to="d_home" />} />
          <Route path="d_home" element={<DashBoardHome />} />
          <Route path="orders" element={<OrdersHome />} />
          <Route path="delivery" element={<DeliveryHome />} />
          <Route path="products/*" element={<ProductsLayout />} />
          <Route path="offers_discounts" element={<OffersDiscounts />} />
          <Route path="customers" element={<CustomerHome />} />
          <Route path="store_settings/*" element={<SettingsLayout />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoardLayout;
