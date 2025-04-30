function extractInfoFromDescription(description: string) {
  const lowerDesc = description.toLowerCase();

  const salaryMatch = description.match(/₹[\s]?[0-9,]+(?:\s*-\s*₹?[\d,]+)?/g);
  const qualificationsMatch = description.match(/(bachelor|graduate|education|required|qualification|degree).{0,100}/i);
  const experienceMatch = description.match(/(\d+)\s?(year|years)/i);

  const knownSkills = ["React", "JavaScript", "Photoshop", "Corel draw", "Node.js", "MongoDB", "PM7", "Akruti"];
  const skills = knownSkills.filter(skill =>
    lowerDesc.includes(skill.toLowerCase())
  );

  return {
    salary: salaryMatch?.[0] || null,
    qualifications: qualificationsMatch?.[0] || null,
    experience: experienceMatch?.[0] || null,
    skills
  };
}

export async function fetchJobs(query: string) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&country=in&language=en`;

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

    return (data.data || []).map((job: any) => {
      const parsed = extractInfoFromDescription(job.job_description || "");

      return {
        job_id: job.job_id,
        job_title: job.job_title,
        employer_name: job.employer_name,
        employment_type: job.job_employment_type,
        job_google_link: job.job_google_link,
        employer_logo: job.employer_logo,
        job_city: job.job_city,
        job_apply_link: job.job_apply_link,
        job_type: job.job_employment_type,
        job_types: job.job_employment_types,
        job_description: job.job_description,
        job_is_remote: job.job_is_remote,
        job_posted_at2: job.job_posted_at,
        job_posted_at: job.job_posted_at_datetime_utc,
        ...parsed, // ← extracted fields
      };
    });

  } catch (error) {
    console.error(error);
    return [];
  }
}




