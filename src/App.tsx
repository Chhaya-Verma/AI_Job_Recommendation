import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./pages/Home";
import Recommendation from "./pages/Recommendations";

function App() {
  return (
    <Router>
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="home" element={<Home/>} />
        <Route path="/find-jobs" element={<Recommendation />} />
      </Routes>
    </Router>
  );
}

export default App;
