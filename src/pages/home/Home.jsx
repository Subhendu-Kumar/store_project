import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { imageArray, information } from "@/data";
import { FaWandMagicSparkles } from "react-icons/fa6";
import hero_banner from "../../../public/hero_banner.webp";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-white">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center justify-center pl-20 w-full h-auto"
        >
          <div className="w-full h-auto flex items-center justify-between">
            <div className="w-[45%] h-auto flex flex-col items-start justify-start gap-6">
              <h1 className="text-black text-5xl font-sans font-bold">
                Empowering Your Global Business, Built for Unmatched Performance
              </h1>
              <p className="text-gray-600 text-lg font-sans font-semibold">
                Effortlessly create a captivating online store that draws in
                customers and boosts conversions
              </p>
              <Button>Get started</Button>
            </div>
            <div className="w-[50%] h-auto overflow-visible">
              <img
                src={hero_banner}
                alt="hero_banner"
                className="w-full object-center object-cover"
              />
            </div>
          </div>
        </motion.div>
      </AuroraBackground>
      <div className="w-full h-32 bg-zinc-800 flex items-center justify-center">
        <InfiniteMovingCards
          items={imageArray}
          direction="right"
          speed="slow"
        />
      </div>
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
    </div>
  );
};

export default Home;
