import { Button } from '../ui/button'
import { FaStore } from 'react-icons/fa'

const GetStarted = () => {
  return (
    <div className="w-full h-auto px-40 py-20">
        <div className="w-full h-[30rem] bg-custom-image rounded-lg px-32 py-28 flex flex-col items-start justify-between">
          <FaStore className="text-6xl" />
          <h1 className="text-5xl font-sans font-bold text-black">
            Start selling online.
          </h1>
          <p className="w-[45%] text-left text-xl font-sans font-semibold text-gray-500">
            Take your business online with Dukaan. Get your free online store in
            30 seconds.
          </p>
          <Button>Get started</Button>
        </div>
      </div>
  )
}

export default GetStarted