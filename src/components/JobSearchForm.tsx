import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

export function JobSearchForm({ onSearch }: Props) {
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = `${skill} in ${location}`;
    onSearch(query); // Passing the query back to the parent
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
      <input
        type="text"
        placeholder="Enter skill (e.g. React Developer)"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
        required
      />
      <input
        type="text"
        placeholder="Location (e.g. Delhi)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
