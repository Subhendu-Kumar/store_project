import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarDesktop from "@/components/sidebar/SidebarDesktop";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "home";
  const [store, setStore] = useState(null);
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const currentTab = queryParams.get("tab");
    if (currentTab !== tab) {
      queryParams.set("tab", tab);
      if (currentTab !== tab) {
        navigate(`${location.pathname}?${queryParams.toString()}`, {
          replace: true,
        });
      }
    }
  }, [tab, navigate, location.pathname]);

  useEffect(() => {
    setStore(getStoreData());
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <SidebarDesktop store={store} tab={tab} setTab={setTab} />
      <div className="w-full h-full bg-white"></div>
    </div>
  );
};

export default Dashboard;
