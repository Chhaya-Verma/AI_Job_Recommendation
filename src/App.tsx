import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./pages/Home";
import Recommendation from "./pages/Recommendations";
import ForgotPassword from "./Auth/ForgotPassword";
import SavedJobs from "./pages/SavedJobs";

function App() {
  return (
    <Router>
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="home" element={<Home/>} />
        <Route path="/find-jobs" element={<Recommendation />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
