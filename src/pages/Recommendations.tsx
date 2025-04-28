import { useEffect, useState } from "react";
import { JobSearchForm } from "../components/JobSearchForm";
import { fetchJobs } from "../api/fetchJobs";

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_city: string;
  job_apply_link: string;
  job_type?: string;
  job_description?: string;
  job_is_remote?: boolean;
  job_min_salary?: number;
  job_max_salary?: number;
  job_salary_currency?: string;
  job_posted_at?: string;
}

function Recommendation() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetchJobs(query)
      .then(setJobs)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
        Job Recommendations
      </h1>

      <JobSearchForm onSearch={setQuery} />

      <div className="grid gap-4 mt-6">
        {loading && (
          <p className="text-gray-500 text-center">Loading jobs...</p>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-gray-500 text-center">
            No jobs found. Try another search.
          </p>
        )}

        {!loading &&
          jobs.map((job) => (
            <div key={job.job_id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center gap-4 mb-2">
                {job.employer_logo && (
                  <img
                    src={job.employer_logo}
                    alt="Logo"
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{job.job_title}</h2>
                  <p className="text-gray-600">
                    {job.employer_name} – {job.job_city}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-1">
                🧾 <strong>Type:</strong> {job.job_type || "N/A"} | 🏡{" "}
                <strong>Remote:</strong> {job.job_is_remote ? "Yes" : "No"}
              </p>

              {job.job_min_salary && (
                <p className="text-sm text-green-600 mb-1">
                  💰 <strong>Salary:</strong> {job.job_salary_currency}{" "}
                  {job.job_min_salary} – {job.job_max_salary}
                </p>
              )}

              {job.job_posted_at && (
                <p className="text-sm text-gray-500 mb-1">
                  📅 <strong>Posted:</strong>{" "}
                  {new Date(job.job_posted_at).toLocaleDateString()}
                </p>
              )}

              {job.job_description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  📄 {job.job_description.slice(0, 150)}...
                </p>
              )}

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
