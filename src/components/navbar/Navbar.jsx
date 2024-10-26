import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { FaStore } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearUserData, getOwnerData, getToken } from "@/lib/utils";

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
          <Link to="/dashboard">
            <button className="hover:scale-105 transition-all duration-500 ease-in-out hover:text-purple-500">
              Dashboard
            </button>
          </Link>
        )}
        <button className="hover:scale-105 transition-all duration-500 ease-in-out hover:text-purple-500">
          Products
        </button>
        <button className="hover:scale-105 transition-all duration-500 ease-in-out hover:text-purple-500">
          About
        </button>
      </div>
      {token ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-gray-500">
              {user_name}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="left" className="w-32 p-1 text-center">
            <button onClick={handleLogout}>logout</button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          onClick={() => navigate("/auth")}
          className="text-base font-sans font-medium"
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Navbar;
