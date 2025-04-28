// src/api/fetchJobs.ts
export async function fetchJobs(query: string) {
    const apiKey = import.meta.env.VITE_API_KEY;
  
    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&country=us&language=en`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
  
      const data = await response.json();
  
      // Return only relevant fields (you can adjust as needed)
      return (data.data || []).map((job: any) => ({
        job_id: job.job_id,
        job_title: job.job_title,
        employer_name: job.employer_name,
        employer_logo: job.employer_logo,
        job_city: job.job_city,
        job_apply_link: job.job_apply_link,
        job_type: job.job_employment_type,
        job_description: job.job_description,
        job_is_remote: job.job_is_remote,
        job_min_salary: job.job_min_salary,
        job_max_salary: job.job_max_salary,
        job_salary_currency: job.job_salary_currency,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  





