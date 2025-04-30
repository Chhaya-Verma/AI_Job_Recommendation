import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";

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

    await deleteDoc(doc(db, "users", userId, "savedJobs", jobId));
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
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
        <div className="grid gap-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{job.job_title}</h2>
              <p className="text-gray-600">{job.employer_name} – {job.job_city}</p>

              <a
                href={job.job_apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                Apply Now
              </a>

              <button
                onClick={() => handleDelete(job.id)}
                className="mt-2 text-red-500 hover:underline text-sm"
              >
                Remove from Saved
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default SavedJobs;
