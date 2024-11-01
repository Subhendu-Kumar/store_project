import { product_items } from "@/data";
import Categories from "@/sections/products/Categories";
import AllProducts from "@/sections/products/AllProducts";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const ProductsLayout = () => {
  const navigate = useNavigate();

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
              onClick={() =>
                navigate(`/dashboard/products/${item.id.toLowerCase()}`)
              }
              className={`w-fit px-3 py-1 rounded-lg text-lg font-sans font-medium capitalize transition-all duration-300 ease-in-out ${
                location.pathname.includes(
                  `/dashboard/products/${item.id.toLowerCase()}`
                )
                  ? "bg-orange-200"
                  : "hover:bg-orange-100"
              } `}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <Routes>
        <Route path="" element={<Navigate to="categories" />} />
        <Route path="categories" element={<Categories />} />
        <Route path="all_products" element={<AllProducts />} />
      </Routes>
    </div>
  );
};

export default ProductsLayout;
