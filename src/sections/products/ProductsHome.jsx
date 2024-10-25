import { useState } from "react";
import Categories from "./Categories";
import { product_items } from "@/data";
import AllProducts from "./AllProducts";

const ProductsHome = () => {
  const [tab, setTab] = useState("all_products");

  return (
    <div className="w-full h-full p-4 overflow-y-scroll pb-20">
      <h1 className="text-2xl font-semibold font-sans border-b border-gray-500 pb-3">
        Products
      </h1>
      <div className="w-full h-auto mt-3 px-4 py-2 bg-zinc-100 rounded-lg flex items-center justify-center gap-3">
        {product_items.map((item, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setTab(item.id)}
              className={`w-fit px-3 py-1 rounded-lg text-lg font-sans font-medium capitalize transition-all duration-300 ease-in-out ${
                tab === item.id
                  ? "bg-orange-400 text-white"
                  : "hover:bg-orange-200 hover:underline"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      {tab === "categories" && <Categories />}
      {tab === "all_products" && <AllProducts />}
    </div>
  );
};

export default ProductsHome;
