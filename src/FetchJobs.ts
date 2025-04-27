// src/api/fetchJobs.ts
export async function fetchJobs(query: string) {
    // Fetch the API key from the .env file using import.meta.env
    const apiKey = import.meta.env.VITE_API_KEY; 
  
    // Define your API URL using the query and the API key
    const url = `https://your-api-url.com/search?query=${query}&apiKey=${apiKey}`;
  
    try {
      // Fetch the data from the API
      const response = await fetch(url);
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Return the job data (assuming jobs are in the 'jobs' field)
      return data.jobs; 
    } catch (error) {
      console.error(error);
      return [];  // Return an empty array if there's an error
    }
  }
  