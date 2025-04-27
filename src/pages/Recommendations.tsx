import { useEffect, useState } from "react";
import { JobSearchForm } from "../components/JobSearchForm"; // Correct import
import { fetchJobs } from "../api/fetchJobs"; // Assuming fetchJobs is your API function

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  job_apply_link: string;
}

function Recommendation() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("Frontend Developer");

  // Fetch jobs whenever the query changes
  useEffect(() => {
    fetchJobs(query).then(setJobs);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Job Recommendations</h1>

      {/* Job search form */}
      <JobSearchForm onSearch={setQuery} />

      {/* Job list display */}
      <div className="grid gap-4 mt-6">
        {Array.isArray(jobs) && jobs.length === 0 && <p className="text-gray-500">No jobs found. Try another search.</p>}
        {Array.isArray(jobs) && jobs.length > 0 && jobs.map((job) => (
          <div key={job.job_id} className="bg-white p-4 rounded shadow">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendation;
