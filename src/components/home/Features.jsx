import { features } from "@/data";

const Features = () => {
  return (
    <div className="w-full h-auto px-40 py-12 bg-orange-50">
      <h1 className="text-3xl font-sans font-semibold text-black text-center">
        Empowering Your Sales, Elevating Your Success
      </h1>
      <p className="text-base text-center mt-4 font-sans font-medium text-gray-500">
        Empowering Growth with Tools Tailored for Your Online Success
      </p>
      <div className="w-full h-auto mt-20 grid grid-cols-3 gap-8">
        {features.map((data, idx) => {
          return (
            <div
              key={idx}
              className="w-full h-40 bg-slate-50 border border-gray-300 rounded-lg shadow-md flex items-center justify-center flex-col gap-3"
            >
              <div className="w-16 h-16">
                <img
                  src={data.img}
                  alt="image"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-xl font-sans font-semibold text-black">
                {data.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
