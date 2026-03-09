import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import Request from "./pages/Request";
import AllDonations from "./pages/AllDonations";
import AllRequests from "./pages/AllRequests";
import BloodCompatibility from "./pages/BloodCompatibility";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/request" element={<Request />} />
        <Route path="/alldonations" element={<AllDonations />} />
        <Route path="/allrequests" element={<AllRequests />} />
        <Route path="/compatibility" element={<BloodCompatibility />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
