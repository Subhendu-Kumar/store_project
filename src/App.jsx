import Layout from "./Layout";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full h-screen bg-zinc-100 select-none">
      <Router>
        <Layout />
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
