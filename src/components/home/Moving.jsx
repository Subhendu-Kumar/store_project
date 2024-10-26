import { imageArray } from "@/data";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const Moving = () => {
  return (
    <div className="w-full h-32 bg-zinc-800 flex items-center justify-center">
      <InfiniteMovingCards items={imageArray} direction="right" speed="slow" />
    </div>
  );
};

export default Moving;
