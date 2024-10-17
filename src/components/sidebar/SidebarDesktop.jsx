import { sidebar_items } from "@/data";
import { useNavigate } from "react-router-dom";
import { FaStore, FaWallet } from "react-icons/fa6";
import { RiShareForward2Line } from "react-icons/ri";

const SidebarDesktop = ({ store, tab, setTab }) => {
  const navigate = useNavigate();
  const store_name = store?.name;
  const custom_store = store_name?.toLowerCase().split(" ").join("_");

  return (
    <div className="w-[20%] h-full border-r bg-orange-50 border-zinc-300 p-4 flex flex-col items-start justify-between">
      <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-between w-full gap-2 text-2xl font-sans font-semibold cursor-pointer border-b border-zinc-600 pb-3">
          <div
            className="flex items-center gap-2 justify-center"
            onClick={() => navigate("/")}
          >
            <FaStore />
            <p className="capitalize">{store_name}</p>
          </div>
          <div
            className="text-base"
            onClick={() => navigate(`/${custom_store}`)}
          >
            <RiShareForward2Line />
          </div>
        </div>
        <div className="w-full h-auto flex items-start justify-start flex-col">
          {sidebar_items.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setTab(item.id)}
                className={`w-full h-auto px-3 py-2 flex items-center justify-start gap-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${
                  tab === item.id ? "bg-orange-200" : "hover:bg-orange-100"
                }`}
              >
                <item.icon className="text-xl" />
                <p className="text-lg font-sans font-semibold capitalize">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-20 bg-orange-100 rounded-xl px-3 py-4 flex items-center justify-start gap-2">
        <div className="h-full w-12 rounded-md flex items-center justify-center bg-orange-200 text-2xl text-gray-500">
          <FaWallet />
        </div>
        <div className="w-auto h-full flex items-start justify-start flex-col">
          <p className="text-sm text-gray-500">Store credits:</p>
          <p className="text-base font-semibold">0</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
