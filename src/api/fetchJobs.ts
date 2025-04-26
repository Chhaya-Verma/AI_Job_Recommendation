export async function fetchJobs(query: string) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${query}&num_pages=1`, options);
    const result = await response.json();
    console.log("API response:", result); // ✅ Add this line
    return result.data; // check if data is undefined
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
