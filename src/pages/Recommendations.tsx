// /////////////////////// for the firestone ////////////////////
// import { useEffect, useState } from "react";
// import { JobSearchForm } from "../components/JobSearchForm";
// import Navbar from "../components/Navbar";
// import { fetchJobs } from "../api/fetchJobs";
// import { auth, db } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";

// interface Job {
//   job_id: string;
//   job_title: string;
//   employer_name: string;
//   employment_type?: string;
//   employer_logo?: string;
//   job_city: string;
//   job_state?: string;
//   job_country?: string;
//   job_location?: string;
//   job_apply_link: string;
//   job_type?: string;
//   job_types?: string[];
//   job_description?: string;
//   job_is_remote?: boolean;
//   job_min_salary?: number;
//   job_max_salary?: number;
//   job_salary_currency?: string;
//   job_posted_at?: string;
//   job_posted_at2?: string;
//   salary?: string;
//   qualifications?: string;
//   experience?: string;
//   skills?: string[];
//   job_google_link?: string;
// }

// function Recommendation() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   useEffect(() => {
//     if (!query) return;

//     setLoading(true);
//     fetchJobs(query)
//       .then((data) => {
//         setJobs(data);
//         if (data.length > 0) setSelectedJob(data[0]);
//       })
//       .finally(() => setLoading(false));
//   }, [query]);

//   const handleSaveJob = async (job: Job) => {
//     const user = auth.currentUser;
//     if (!user) {
//       alert("Please login to save jobs.");
//       return;
//     }

//     try {
//       await setDoc(doc(db, "users", user.uid, "savedJobs", job.job_id), {
//         ...job,
//       });
//       alert("Job saved successfully!");
//     } catch (error) {
//       console.error("Error saving job:", error);
//       alert("Failed to save job.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 p-6">
//         <h1 className="text-3xl font-bold mb-4 text-center text-[#6D2764]">
//           Job Recommendations
//         </h1>

//         <JobSearchForm onSearch={setQuery} />

//         {loading && (
//           <p className="text-center text-gray-500 mt-4">Loading jobs...</p>
//         )}

//         {!loading && jobs.length === 0 && (
//           <p className="text-center text-gray-500 mt-4">
//             No jobs found. Try another search.
//           </p>
//         )}

//         {!loading && jobs.length > 0 && (
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Left side: Detailed Job View */}
//             <div className="md:col-span-2 bg-white p-4 rounded shadow">
//               {selectedJob && (
//                 <>
//                   <div className="flex items-center gap-4 mb-4">
//                     {selectedJob.employer_logo && (
//                       <img
//                         src={selectedJob.employer_logo}
//                         alt="Logo"
//                         className="w-16 h-16 object-contain"
//                       />
//                     )}
//                     <div>
//                       <h2 className="text-2xl font-semibold">
//                         {selectedJob.job_title}
//                       </h2>
//                       <p className="text-gray-600">
//                         {selectedJob.employer_name} – {selectedJob.job_city},{" "}
//                         {selectedJob.job_state}, {selectedJob.job_country}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-sm text-gray-700 mb-1">
//                     🧾 <strong>Type:</strong>{" "}
//                     {selectedJob.employment_type || selectedJob.job_type}
//                   </p>
//                   <p className="text-sm text-gray-700 mb-1">
//                     🏡 <strong>Remote:</strong>{" "}
//                     {selectedJob.job_is_remote ? "Yes" : "No"}
//                   </p>
//                   <p className="text-sm text-gray-700 mb-1">
//                     📍 <strong>Location:</strong>{" "}
//                     <a
//                       href={`https://www.google.com/maps/search/${encodeURIComponent(
//                         selectedJob.job_location || ""
//                       )}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       {selectedJob.job_location || "N/A"}
//                     </a>
//                   </p>

//                   {selectedJob.job_posted_at && (
//                     <p className="text-sm text-gray-500 mb-1">
//                       📅 <strong>Posted (formatted):</strong>{" "}
//                       {new Date(selectedJob.job_posted_at).toLocaleDateString()}
//                     </p>
//                   )}

//                   {selectedJob.job_posted_at2 && (
//                     <p className="text-sm text-gray-500 mb-1">
//                       🕒 <strong>Posted (raw):</strong>{" "}
//                       {selectedJob.job_posted_at2}
//                     </p>
//                   )}

//                   {selectedJob.salary && (
//                     <p className="text-sm text-gray-700 mb-1">
//                       💰 <strong>Salary:</strong> {selectedJob.salary}
//                     </p>
//                   )}
//                   {selectedJob.qualifications && (
//                     <p className="text-sm text-gray-700 mb-1">
//                       🎓 <strong>Qualifications:</strong>{" "}
//                       {selectedJob.qualifications}
//                     </p>
//                   )}
//                   {selectedJob.experience && (
//                     <p className="text-sm text-gray-700 mb-1">
//                       🏢 <strong>Experience:</strong> {selectedJob.experience}
//                     </p>
//                   )}
//                   {selectedJob.skills?.length && (
//                     <p className="text-sm text-gray-700 mb-1">
//                       🛠 <strong>Skills:</strong> {selectedJob.skills.join(", ")}
//                     </p>
//                   )}

//                   {selectedJob.job_description && (
//                     <>
//                       <p className="text-gray-800 mt-4 whitespace-pre-wrap">
//                         {showFullDescription
//                           ? selectedJob.job_description
//                           : `${selectedJob.job_description.slice(0, 500)}...`}
//                       </p>
//                       {selectedJob.job_description.length > 500 && (
//                         <button
//                           className="text-blue-600 mt-2 hover:underline"
//                           onClick={() =>
//                             setShowFullDescription(!showFullDescription)
//                           }
//                         >
//                           {showFullDescription ? "Read Less" : "Read More"}
//                         </button>
//                       )}
//                     </>
//                   )}

//                   <div className="flex gap-2 mt-4">
//                     <a
//                       href={selectedJob.job_apply_link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline"
//                     >
//                       Apply Now
//                     </a>

//                     {selectedJob.job_google_link && (
//                       <a
//                         href={selectedJob.job_google_link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-purple-600 hover:underline"
//                       >
//                         View on Google
//                       </a>
//                     )}

//                     <button
//                       onClick={() => handleSaveJob(selectedJob)}
//                       className="text-white bg-[#6D2764] hover:bg-[#6D2764] px-3 py-1 rounded"
//                     >
//                       Save Job
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Right side: Job Cards */}
//             <div className="flex flex-col gap-4 overflow-auto max-h-[80vh]">
//               {jobs.map((job) => (
//                 <div
//                   key={job.job_id}
//                   className={`bg-white p-3 rounded shadow cursor-pointer hover:bg-blue-50 ${
//                     job.job_id === selectedJob?.job_id
//                       ? "border border-blue-500"
//                       : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedJob(job);
//                     setShowFullDescription(false);
//                   }}
//                 >
//                   <h3 className="text-lg font-medium">{job.job_title}</h3>
//                   <p className="text-sm text-gray-600">
//                     {job.employer_name} – {job.job_city}
//                   </p>
//                   {job.job_description && (
//                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">
//                       {job.job_description.slice(0, 100)}...
//                     </p>
//                   )}
//                   {job.job_posted_at2 && (
//                     <p className="text-xs text-gray-400 mt-1">
//                       🕒 Posted: {job.job_posted_at2}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Recommendation;




/////////////////////// for the ui-enhancement////////////////////
import { useEffect, useState } from "react";
import { JobSearchForm } from "../components/JobSearchForm";
import Navbar from "../components/Navbar";
import { fetchJobs } from "../api/fetchJobs";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employment_type?: string;
  employer_logo?: string;
  job_city: string;
  job_state?: string;
  job_country?: string;
  job_location?: string;
  job_apply_link: string;
  job_type?: string;
  job_types?: string[];
  job_description?: string;
  job_is_remote?: boolean;
  job_min_salary?: number;
  job_max_salary?: number;
  job_salary_currency?: string;
  job_posted_at?: string;
  job_posted_at2?: string;
  salary?: string;
  qualifications?: string;
  experience?: string;
  skills?: string[];
  job_google_link?: string;
}

function Recommendation() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetchJobs(query)
      .then((data) => {
        setJobs(data);
        if (data.length > 0) setSelectedJob(data[0]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const handleSaveJob = async (job: Job) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to save jobs.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid, "savedJobs", job.job_id), {
        ...job,
      });
      alert("Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job.");
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="bg-[#6D2764]">
        <div className="w-full">
          <Navbar />
        </div>

        <div className="text-center text-white py-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-lg mb-8">
            Start your job search today with the best AI-powered recommendations
            tailored to your skills and interests.
          </p>
          <JobSearchForm onSearch={setQuery} />
        </div>
      </div>

      {/* Popular Searches */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-center text-[#6D2764] mb-4">
          Popular Searches
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Frontend Developer",
            "Data Analyst",
            "React",
            "Python",
            "Remote",
            "Marketing",
            "AI Engineer",
            "Java",
            "Product Manager",
            "UI/UX Designer",
          ].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="bg-white text-[#6D2764] border border-[#6D2764] px-4 py-2 rounded-full hover:bg-[#6D2764] hover:text-white transition"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Job Recommendations - Only if a query is made */}
      {query && (
        <div className="min-h-screen bg-gray-100 p-6">
          {loading && (
            <p className="text-center text-gray-500 mt-4">Loading jobs...</p>
          )}

          {!loading && jobs.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No jobs found. Try another search.
            </p>
          )}

          {!loading && jobs.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-25">
              <h1 className="text-3xl font-bold mb-4 text-center text-[#6D2764] md:col-span-3">
                Jobs Recommended for You
              </h1>

              {/* Left - Job Details */}
              <div className="md:col-span-2 bg-white p-4 rounded shadow">
                {selectedJob && (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      {selectedJob.employer_logo && (
                        <img
                          src={selectedJob.employer_logo}
                          alt="Logo"
                          className="w-16 h-16 object-contain"
                        />
                      )}
                      <div>
                        <h2 className="text-2xl font-semibold">
                          {selectedJob.job_title}
                        </h2>
                        <p className="text-gray-600">
                          {selectedJob.employer_name} – {selectedJob.job_city},{" "}
                          {selectedJob.job_state}, {selectedJob.job_country}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-1">
                      🧾 <strong>Type:</strong>{" "}
                      {selectedJob.employment_type || selectedJob.job_type}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      🏡 <strong>Remote:</strong>{" "}
                      {selectedJob.job_is_remote ? "Yes" : "No"}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      📍 <strong>Location:</strong>{" "}
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(
                          selectedJob.job_location || ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedJob.job_location || "N/A"}
                      </a>
                    </p>

                    {selectedJob.job_posted_at && (
                      <p className="text-sm text-gray-500 mb-1">
                        📅 <strong>Posted:</strong>{" "}
                        {new Date(
                          selectedJob.job_posted_at
                        ).toLocaleDateString()}
                      </p>
                    )}

                    {selectedJob.job_posted_at2 && (
                      <p className="text-sm text-gray-500 mb-1">
                        🕒 <strong>Posted (raw):</strong>{" "}
                        {selectedJob.job_posted_at2}
                      </p>
                    )}

                    {selectedJob.salary && (
                      <p className="text-sm text-gray-700 mb-1">
                        💰 <strong>Salary:</strong> {selectedJob.salary}
                      </p>
                    )}
                    {selectedJob.qualifications && (
                      <p className="text-sm text-gray-700 mb-1">
                        🎓 <strong>Qualifications:</strong>{" "}
                        {selectedJob.qualifications}
                      </p>
                    )}
                    {selectedJob.experience && (
                      <p className="text-sm text-gray-700 mb-1">
                        🏢 <strong>Experience:</strong> {selectedJob.experience}
                      </p>
                    )}
                    {selectedJob.skills?.length && (
                      <p className="text-sm text-gray-700 mb-1">
                        🛠 <strong>Skills:</strong>{" "}
                        {selectedJob.skills.join(", ")}
                      </p>
                    )}

                    {selectedJob.job_description && (
                      <>
                        <p className="text-gray-800 mt-4 whitespace-pre-wrap">
                          {showFullDescription
                            ? selectedJob.job_description
                            : `${selectedJob.job_description.slice(0, 500)}...`}
                        </p>
                        {selectedJob.job_description.length > 500 && (
                          <button
                            className="text-blue-600 mt-2 hover:underline"
                            onClick={() =>
                              setShowFullDescription(!showFullDescription)
                            }
                          >
                            {showFullDescription ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </>
                    )}

                    <div className="flex gap-2 mt-4">
                      <a
                        href={selectedJob.job_apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Apply Now
                      </a>

                      {selectedJob.job_google_link && (
                        <a
                          href={selectedJob.job_google_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline"
                        >
                          View on Google
                        </a>
                      )}

                      <button
                        onClick={() => handleSaveJob(selectedJob)}
                        className="text-white bg-[#6D2764] hover:bg-[#6D2764] px-3 py-1 rounded"
                      >
                        Save Job
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Right - Job Cards List */}
              <div className="flex flex-col gap-4 overflow-auto max-h-[80vh]">
                {jobs.map((job) => (
                  <div
                    key={job.job_id}
                    className={`bg-white p-3 rounded shadow cursor-pointer hover:bg-blue-50 ${
                      job.job_id === selectedJob?.job_id
                        ? "border border-blue-500"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedJob(job);
                      setShowFullDescription(false);
                    }}
                  >
                    <h3 className="text-lg font-medium">{job.job_title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.employer_name} – {job.job_city}
                    </p>
                    {job.job_description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {job.job_description.slice(0, 100)}...
                      </p>
                    )}
                    {job.job_posted_at2 && (
                      <p className="text-xs text-gray-400 mt-1">
                        🕒 Posted: {job.job_posted_at2}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Recommendation;
