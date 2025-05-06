import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import { FiTrash2 } from "react-icons/fi"; // For delete icon
import { MdCancel } from "react-icons/md"; // For confirmation cancel icon
import { IoCheckmarkCircleSharp } from "react-icons/io5"; // For confirmation icon

interface Job {
  id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  job_apply_link: string;
}

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  // Get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch saved jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!userId) return;

      const savedJobsRef = collection(db, "users", userId, "savedJobs");
      const snapshot = await getDocs(savedJobsRef);

      const jobs: Job[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Job, "id">),
      }));

      setSavedJobs(jobs);
      setLoading(false);
    };

    fetchSavedJobs();
  }, [userId]);

  const handleDelete = async (jobId: string) => {
    if (!userId) return;

    // Proceed with deletion
    await deleteDoc(doc(db, "users", userId, "savedJobs", jobId));
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    setShowConfirmation(null); // Hide confirmation modal after deletion
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-[#6D2764] mb-6">Saved Jobs</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : savedJobs.length === 0 ? (
          <p className="text-center text-gray-500">No saved jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md border hover:shadow-xl transition duration-300"
              >
                <h2 className="text-lg font-semibold text-[#6D2764]">{job.job_title}</h2>
                <p className="text-gray-600 mb-2">
                  {job.employer_name} – {job.job_city}
                </p>

                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#6D2764] text-white px-4 py-2 rounded hover:bg-[#511f4b] transition"
                >
                  Apply Now
                </a>

                <div className="flex items-center mt-3 space-x-2">
                  <button
                    onClick={() => setShowConfirmation(job.id)} // Show confirmation modal
                    className="text-red-500 hover:text-red-600 text-sm flex items-center space-x-1"
                  >
                    <FiTrash2 className="text-xl" />
                    <span>Remove the job</span>
                  </button>
                </div>

                {/* Confirmation modal */}
                {showConfirmation === job.id && (
  <>
    {/* Just blur, no black background */}
    <div className="fixed inset-0 backdrop-blur-md z-40" />

    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <IoCheckmarkCircleSharp className="text-4xl text-green-500 mx-auto mb-4" />
        <p className="mb-4 text-lg">Are you sure you want to remove this job?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleDelete(job.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Yes, Remove
          </button>
          <button
            onClick={() => setShowConfirmation(null)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition flex items-center gap-1"
          >
            <MdCancel className="text-xl" /> Cancel
          </button>
        </div>
      </div>
    </div>
  </>
)}

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SavedJobs;
