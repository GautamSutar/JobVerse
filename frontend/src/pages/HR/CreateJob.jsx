import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    role: "",
    description: "",
    responsibilities: "",
    location: "",
    salary: "",
    skills: "",
    experience: "",
    deadline: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate job save
    navigate("/hr-dashboard");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-white p-8 mt-32">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Create New Job Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black font-medium">Job Title *</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-black font-medium">Job Role *</label>
            <select
              name="role"
              value={jobData.role}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Role</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
            </select>
          </div>
          <div>
            <label className="block text-black font-medium">
              Job Description *
            </label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-black font-medium">
              Responsibilities *
            </label>
            <textarea
              name="responsibilities"
              value={jobData.responsibilities}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-black font-medium">Location *</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-black font-medium">
              Salary (CTC/Per Month) *
            </label>
            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-black font-medium">
              Required Skills / ATS Keywords *
            </label>
            <input
              type="text"
              name="skills"
              value={jobData.skills}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Comma-separated skills"
            />
          </div>
          <div>
            <label className="block text-black font-medium">
              Experience Level *
            </label>
            <select
              name="experience"
              value={jobData.experience}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Experience</option>
              <option value="0-1">0-1 Years</option>
              <option value="2-3">2-3 Years</option>
            </select>
          </div>
          <div>
            <label className="block text-black font-medium">
              Application Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              value={jobData.deadline}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Save Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
