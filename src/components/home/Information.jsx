import { information } from "@/data";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

const Information = () => {
  return (
    <BackgroundBeamsWithCollision className={"lg:h-auto"}>
      <div className="w-full h-auto px-40 py-20">
        <h1 className="text-3xl font-sans font-semibold px-24 text-center">
          Whether you&apos;re just starting out or scaling up, here&apos;s why{" "}
          <span className="text-orange-500">Store Sync</span> is the right
          choice for your business.
        </h1>
        <div className="w-full h-auto mt-20 gap-20 flex flex-col items-center justify-center">
          {information.map((data, idx) => {
            return (
              <div
                key={idx}
                className={`w-full h-auto flex items-center justify-center gap-6 ${
                  idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="w-1/2 h-auto">
                  <img src={data.img} alt="image" className="w-full" />
                </div>
                <div className="w-1/2 h-full flex flex-col items-start pl-10 justify-center gap-4">
                  {data.desc.map((text, idx) => {
                    return (
                      <div
                        className="flex items-center justify-center gap-2"
                        key={idx}
                      >
                        <FaWandMagicSparkles className="text-2xl text-purple-500" />
                        <p className="text-lg font-sans font-medium">{text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Information;
