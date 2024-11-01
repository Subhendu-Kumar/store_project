import Hero from "@/components/home/Hero";
import Moving from "@/components/home/Moving";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Features from "@/components/home/Features";
import GetStarted from "@/components/home/GetStarted";
import Information from "@/components/home/Information";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-[calc(100vh-4rem)] bg-white">
        <Hero />
        <Moving />
        <Information />
        <Features />
        <GetStarted />
        <Footer />
      </div>
    </>
  );
};

export default Home;
