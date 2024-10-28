import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SettingsHome from "@/sections/settings/SettingsHome";
import ProductsHome from "@/sections/products/ProductsHome";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";
import OffersDiscounts from "@/sections/offers&discounts/OffersDiscounts";
import DashBoardHome from "@/sections/dashboardHome/DashBoardHome";
import OrdersHome from "@/sections/orders/OrdersHome";
import DeliveryHome from "@/sections/delivery/DeliveryHome";
import CustomerHome from "@/sections/customers/CustomerHome";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "home";
  const initialSubTab = queryParams.get("subTab") || "store_details";
  const [store, setStore] = useState(null);
  const [tab, setTab] = useState(initialTab);
  const [subTab, setSubTab] = useState(initialSubTab);

  useEffect(() => {
    const currentTab = queryParams.get("tab");
    const currentSubTab = queryParams.get("subTab");
    if (tab === "store_settings") {
      if (currentTab !== tab || currentSubTab !== subTab) {
        queryParams.set("tab", tab);
        queryParams.set("subTab", subTab);
        navigate(`${location.pathname}?${queryParams.toString()}`, {
          replace: true,
        });
      }
    } else {
      if (queryParams.has("subTab")) {
        queryParams.delete("subTab");
      }
      if (currentTab !== tab) {
        queryParams.set("tab", tab);
        navigate(`${location.pathname}?${queryParams.toString()}`, {
          replace: true,
        });
      }
    }
  }, [tab, subTab, navigate, location.pathname]);

  useEffect(() => {
    setStore(getStoreData());
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <SidebarDesktop store={store} tab={tab} setTab={setTab} />
      <div className="w-full h-full bg-white">
        {tab === "store_settings" && (
          <SettingsHome subTab={subTab} setSubTab={setSubTab} />
        )}
        {tab === "products" && <ProductsHome />}
        {tab === "offers_discounts" && <OffersDiscounts />}
        {tab === "home" && <DashBoardHome />}
        {tab === "orders" && <OrdersHome />}
        {tab === "delivery" && <DeliveryHome />}
        {tab === "customers" && <CustomerHome />}
      </div>
    </div>
  );
};

export default Dashboard;
