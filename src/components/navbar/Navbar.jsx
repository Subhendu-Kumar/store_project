import { FaStore } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserData, getOwnerData, getToken } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [logout, setLogout] = useState(false);

  const user_name = user?.name.split(" ")[0];

  useEffect(() => {
    setToken(getToken());
    setUser(getOwnerData());
  }, [logout]);

  const handleLogout = () => {
    clearUserData();
    setLogout((prev) => !prev);
    navigate("/");
  };

  return (
    <div className="w-full h-16 border-b border-gray-200 bg-white px-20 flex items-center justify-between">
      <div
        className="flex items-center justify-center gap-2 text-2xl font-sans font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaStore />
        <p>Store sync</p>
      </div>
      <div className="flex items-center justify-center gap-4 text-lg font-sans font-semibold">
        <button
          className="hover:scale-105 transition-all duration-500 ease-in-out hover:text-purple-500"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        {token && (
          <button
            className="hover:scale-105 transition-all duration-500 ease-in-out hover:text-purple-500"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}
        <button className="hover:scale-105 transition-all duration-500 ease-in-out hover:text-purple-500">
          Products
        </button>
        <button className="hover:scale-105 transition-all duration-500 ease-in-out hover:text-purple-500">
          About
        </button>
      </div>
      {token ? (
        <Select>
          <SelectTrigger className="w-[150px] border-gray-600">
            {user_name}
          </SelectTrigger>
          <SelectContent className="text-base border-gray-600 bg-zinc-50 font-sans font-medium text-center">
            <button onClick={handleLogout}>Log out</button>
          </SelectContent>
        </Select>
      ) : (
        <button
          className="w-fit h-auto px-3 py-1 bg-zinc-200 border border-gray-500 text-xl font-sans font-semibold hover:scale-105 hover:bg-zinc-300 transition-all duration-500 ease-in-out rounded-lg"
          onClick={() => navigate("/auth")}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;
