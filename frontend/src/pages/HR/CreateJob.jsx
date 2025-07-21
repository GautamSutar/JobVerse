// CreateJob.jsx
import React, { useState } from "react";

const CreateJob = ({ onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "",
    salary: "",
    skills_required: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Create New Job</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location *</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Job Type *</label>
          <select
            name="job_type"
            value={jobData.job_type}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Salary</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Skills Required</label>
          <input
            type="text"
            name="skills_required"
            value={jobData.skills_required}
            onChange={handleInputChange}
            placeholder="Comma-separated skills"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Description *</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Deadline *</label>
          <input
            type="date"
            name="deadline"
            value={jobData.deadline}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Post Job
        </button>
      </div>
    </form>
  );
};

export default CreateJob;
