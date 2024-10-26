import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { AuroraBackground } from "../ui/aurora-background";
import hero_banner from "../../../public/hero_banner.webp";

const Hero = () => {
  return (
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
  );
};

export default Hero;
