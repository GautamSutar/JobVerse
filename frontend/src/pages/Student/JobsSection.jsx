import React from "react";

const dummyJobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp" },
  { id: 2, title: "Backend Intern", company: "CodeBase" },
];

export default function JobsSection() {
  const applyToJob = (id) => alert(`Applied to job ID: ${id}`);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
      <ul className="space-y-3">
        {dummyJobs.map((job) => (
          <li key={job.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
            <button
              onClick={() => applyToJob(job.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
