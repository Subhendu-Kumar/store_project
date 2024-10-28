const DashBoardHome = () => {
  return (
    <div className="w-full h-full p-4 overflow-y-scroll pb-20">
      <h1 className="text-2xl font-semibold font-sans border-b border-gray-500 pb-3">
        Home
      </h1>
      <div className="bg-zinc-100 p-6 rounded-lg shadow-lg mt-6 w-full">
        <h2 className="text-2xl text-black font-semibold mb-2">
          Complete your store setup...
        </h2>
        <p className="text-gray-600 text-base mb-6">
          Use high quality images and product descriptions to have a great
          looking product page. Let&apos;s get started.
        </p>

        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Your e-commerce store is ready!
              </h3>
              <p className="text-gray-600">
                Congratulations! Your e-commerce store is now live.
              </p>
              <a
                href="#"
                className="text-orange-500 mt-2 inline-block text-lg font-bold"
              >
                Visit store
              </a>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Add your first product
              </h3>
              <p className="text-gray-600">
                Start adding products to your online store now!
              </p>
              <a
                href="#"
                className="text-orange-500 mt-2 text-lg font-bold inline-block"
              >
                View product
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="border-2 border-orange-500 text-orange-500 rounded-full h-8 w-8 flex items-center justify-center font-semibold">
                3
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Set up payments
              </h3>
              <p className="text-gray-600">
                Choose how you would like to receive payment for your orders.
              </p>
              <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md">
                Set up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
