import { useEffect, useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const skillPlaceholders = ["Title", "Keyword", "Skill"];
const locationPlaceholders = ["Location", "City"];

export function JobSearchForm({ onSearch }: Props) {
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = `${skill} in ${location}`;
    onSearch(query);
  };

  // Rotating placeholder for skill
  useEffect(() => {
    const interval = setInterval(() => {
      setSkillIndex((prev) => (prev + 1) % skillPlaceholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Rotating placeholder for location
  useEffect(() => {
    const interval = setInterval(() => {
      setLocationIndex((prev) => (prev + 1) % locationPlaceholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-center"
    >
      <input
        type="text"
        placeholder={`Search by ${skillPlaceholders[skillIndex]}`}
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#6D2764]"
        required
      />
      <input
        type="text"
        placeholder={`Search by ${locationPlaceholders[locationIndex]}`}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#6D2764]"
        required
      />
      <button
        type="submit"
        className="bg-white text-[#6D2764] px-5 py-2 rounded-lg shadow hover:bg-[#5a1f54] transition duration-200"
      >
        🔍 Search
      </button>
    </form>
  );
}







