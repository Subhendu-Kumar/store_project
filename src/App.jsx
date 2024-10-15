import {
  Route,
  Routes,
  Navigate,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "@/components/ui/toaster"
import Auth from "./pages/auth/Auth";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {!(location.pathname == "/dashboard" || location.pathname == "/auth") && (
        <Navbar />
      )}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

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
