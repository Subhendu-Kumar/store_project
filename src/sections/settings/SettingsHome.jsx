import StoreDetails from "./StoreDetails";
import WareHouse from "./WareHouse";
import { store_settings_items } from "@/data";

const SettingsHome = ({ subTab, setSubTab }) => {
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
              onClick={() => setSubTab(item.id)}
              className={`w-fit px-3 py-1 rounded-lg text-lg font-sans font-medium capitalize transition-all duration-300 ease-in-out ${
                subTab === item.id
                  ? "bg-orange-400 text-white"
                  : "hover:bg-orange-200"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <div className="w-full h-auto mt-4">
        {subTab === "warehouse" && <WareHouse />}
        {subTab === "store_details" && <StoreDetails />}
      </div>
    </div>
  );
};

export default SettingsHome;
