const DefaultScreen = ({ img, title, description, buttonText, action }) => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-10 mt-6 bg-zinc-100 rounded-lg">
      <div className="w-60 h-60 rounded-full overflow-hidden">
        <img
          alt="warehouse"
          src={img}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <h1 className="text-2xl font-semibold text-zinc-800 mt-2">{title}</h1>
      <p className="text-base font-sans font-medium text-zinc-600">
        {description}
      </p>
      <button
        onClick={action}
        className="w-fit h-auto px-3 py-1 font-sans font-medium text-xl mt-4 bg-orange-500 text-white rounded-md"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DefaultScreen;
