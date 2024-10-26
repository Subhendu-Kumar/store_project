import { FaFlag, FaStore } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-60 px-40 flex flex-col items-center justify-center bg-gray-900">
      <div className="w-full h-[75%] flex items-center justify-start">
        <div className="flex items-center justify-center gap-2 text-4xl text-gray-400 font-sans font-semibold cursor-pointer">
          <FaStore />
          <p>Store sync</p>
        </div>
      </div>
      <div className="w-full h-[25%] border-t border-gray-600 flex items-center justify-between text-gray-300">
        <p>&copy; Subhendu Kumar. All rights reserved, 2024.</p>
        <p className="flex items-center justify-center gap-2 text-base">
          <span>Made In India</span> <FaFlag className="text-orange-500" />
        </p>
      </div>
    </div>
  );
};

export default Footer;
