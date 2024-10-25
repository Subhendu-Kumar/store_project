import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <RotatingLines
      width="80"
      height="80"
      color="grey"
      visible={true}
      strokeWidth="3"
      strokeColor="orange"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default Loader;
