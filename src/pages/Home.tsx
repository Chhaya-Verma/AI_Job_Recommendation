// src/Home.tsx

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const handleFindJobs = () => {
    navigate("/find-jobs"); // This will navigate to the Recommendation page
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1366137792/photo/business-persons-on-meeting-in-the-office.jpg?s=612x612&w=0&k=20&c=0ya-nb5-ksH44xHreYxOOva9Hku1xcA7LtbfTxeSzNE=')",
        }}
      >
        <div className="bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Job Recommendation</h1>
          <p className="text-lg md:text-xl mb-8">
            Find the best job recommendations powered by AI, just for you.
          </p>
          <button
            onClick={handleFindJobs} // Navigate to /find-jobs route
            className="bg-[#6D2764] hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
