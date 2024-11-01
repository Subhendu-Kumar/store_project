import error404 from "../../../public/error404.jpg";

const Error404 = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center bg-white">
      <div className="w-[40rem] h-auto">
        <img src={error404} alt="404 page not found" />
      </div>
      <h1 className="text-center text-2xl uppercase font-sans font-semibold">
        oops! page not found
      </h1>
    </div>
  );
};

export default Error404;
