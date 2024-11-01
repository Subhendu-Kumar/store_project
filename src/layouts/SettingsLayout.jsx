import { store_settings_items } from "@/data";
import WareHouse from "@/sections/settings/WareHouse";
import StoreDetails from "@/sections/settings/StoreDetails";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const SettingsLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-4 overflow-y-scroll pb-20">
      <h1 className="text-2xl font-semibold font-sans border-b border-gray-500 pb-3">
        Store Settings
      </h1>
      <div className="w-full h-auto mt-3 px-4 py-2 bg-zinc-100 rounded-lg flex items-center justify-center gap-3">
        {store_settings_items.map((item, idx) => {
          return (
            <button
              key={idx}
              onClick={() =>
                navigate(`/dashboard/store_settings/${item.id.toLowerCase()}`)
              }
              className={`w-fit px-3 py-1 rounded-lg text-lg font-sans font-medium capitalize transition-all duration-300 ease-in-out ${
                location.pathname.includes(
                  `/dashboard/store_settings/${item.id.toLowerCase()}`
                )
                  ? "bg-orange-400 text-white"
                  : "hover:bg-orange-200"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <Routes>
        <Route path="" element={<Navigate to="store_details" />} />
        <Route path="store_details" element={<StoreDetails />} />
        <Route path="warehouse" element={<WareHouse />} />
      </Routes>
    </div>
  );
};

export default SettingsLayout;
