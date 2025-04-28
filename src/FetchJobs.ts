// // src/api/fetchJobs.ts
// export async function fetchJobs(query: string) {
//     // Fetch the API key from the .env file using import.meta.env
//     const apiKey = import.meta.env.VITE_API_KEY; 
  
//     // Define your API URL using the query and the API key
//     const url = `https://your-api-url.com/search?query=${query}&apiKey=${apiKey}`;
  
//     try {
//       // Fetch the data from the API
//       const response = await fetch(url);
  
//       // Check if the response is successful
//       if (!response.ok) {
//         throw new Error('Failed to fetch jobs');
//       }
  
//       // Parse the JSON response
//       const data = await response.json();
  
//       // Return the job data (assuming jobs are in the 'jobs' field)
//       return data.jobs; 
//     } catch (error) {
//       console.error(error);
//       return [];  // Return an empty array if there's an error
//     }
//   }
  




//////////////////second with more details /////////////
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
  





/////////////// testing working for some time for Resume parse ///////////
// src/api/fetchJobs.ts
// export async function fetchJobs(query: string) {
//     const apiKey = import.meta.env.VITE_API_KEY;
    
//     const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&country=us&language=en`;
  
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': apiKey,
//                 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
//             },
//         });
  
//         if (!response.ok) {
//             throw new Error('Failed to fetch jobs');
//         }
  
//         const data = await response.json();
//         return data.data || [];  // ✅ JSearch API returns jobs inside 'data' field
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
//   }
  